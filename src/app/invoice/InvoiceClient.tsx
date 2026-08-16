'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  Trash2, 
  Plus, 
  Printer, 
  Building, 
  User, 
  FileText, 
  CreditCard, 
  LogOut, 
  Check, 
  RefreshCw,
  Eye,
  EyeOff,
  Share2,
  ArrowLeft,
  Copy,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Types for invoice & quotation items
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // percentage (e.g. 18)
  period?: string;
  discountPct?: number;
}

interface CompanyProfile {
  companyName: string;
  brandName: string;
  registeredOfficeAddress: string;
  panNumber: string;
  bankAccountName: string;
  bankAccountNumber: string;
  ifscCode: string;
  upiId: string;
  documentTitle: string; // 'Commercial Invoice' | 'Sales Invoice'
  gstDeclaration: string;
  qrCodeImage?: string;
  applyGst?: boolean;
  signatureImage?: string;
}

interface ClientDetails {
  customerName: string;
  billingAddress: string;
  shippingAddress: string;
  sameAsBilling: boolean;
}

interface InvoiceDetails {
  invoiceNumber: string;
  dateOfIssue: string;
  gstType: 'intra' | 'inter'; // intra: CGST+SGST, inter: IGST
  advanceAmountPaid?: number;
}

interface QuotationDetails {
  quoteNumber: string;
  dateOfIssue: string;
  validityDays: number;
  clientNote: string;
  advancePercentage?: number;
  scopeSummary?: string;
}

interface SharedState {
  docType: 'invoice' | 'quotation';
  companyProfile: CompanyProfile;
  clientDetails: ClientDetails;
  invoiceDetails?: InvoiceDetails;
  quotationDetails?: QuotationDetails;
  lineItems: LineItem[];
}

// Indian Currency Number to Words converter helper
function numberToIndianWords(num: number): string {
  if (num === 0) return 'Rupees Zero Only';

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const formatAmount = (n: number): string => {
    let str = '';
    if (n >= 10000000) {
      str += formatAmount(Math.floor(n / 10000000)) + ' Crore ';
      n %= 10000000;
    }
    if (n >= 100000) {
      str += formatAmount(Math.floor(n / 100000)) + ' Lakh ';
      n %= 100000;
    }
    if (n >= 1000) {
      str += formatAmount(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    if (n >= 100) {
      str += formatAmount(Math.floor(n / 100)) + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (n < 20) {
        str += ones[n] + ' ';
      } else {
        str += tens[Math.floor(n / 10)] + ' ' + ones[n % 10] + ' ';
      }
    }
    return str.trim();
  };

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let result = 'Rupees ' + formatAmount(integerPart);
  
  if (decimalPart > 0) {
    result += ' and ' + formatAmount(decimalPart) + ' Paise';
  }
  
  return result.trim() + ' Only';
}

// Format number as Indian Currency string
function formatIndianCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

// Generate sequential invoice/quotation numbers helper
function getNextInvoiceNumber(lastNum: string): string {
  if (!lastNum) return 'DL/2026-27/001';
  
  const match = lastNum.match(/(\d+)(?!.*\d)/);
  if (!match) {
    return lastNum + '-01';
  }
  
  const numStr = match[1];
  const numVal = parseInt(numStr, 10);
  const nextVal = numVal + 1;
  const padded = nextVal.toString().padStart(numStr.length, '0');
  const lastIndex = lastNum.lastIndexOf(numStr);
  return lastNum.substring(0, lastIndex) + padded + lastNum.substring(lastIndex + numStr.length);
}

// Expiry date calculation helper
function calculateExpiryDate(issueDateStr: string, days: number): string {
  try {
    const date = new Date(issueDateStr);
    date.setDate(date.getDate() + Number(days || 0));
    return date.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
}

// Serialization / Deserialization helpers for WhatsApp links
function serializeData(data: any): string {
  try {
    const json = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    console.error('Serialization error:', e);
    return '';
  }
}

function deserializeData(base64Str: string): any {
  try {
    const json = decodeURIComponent(escape(atob(base64Str)));
    return JSON.parse(json);
  } catch (e) {
    console.error('Deserialization error:', e);
    return null;
  }
}

export default function InvoiceClient() {
  // Portal Flow and Auth states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isUserReadOnly, setIsUserReadOnly] = useState<boolean>(true);
  const [isPassReadOnly, setIsPassReadOnly] = useState<boolean>(true);
  
  // Custom Admin Credentials states
  const [newAdminUser, setNewAdminUser] = useState<string>('connect@dotnlott.com');
  const [newAdminPass, setNewAdminPass] = useState<string>('Welinv123#');

  // Active mode selection
  const [docType, setDocType] = useState<'select' | 'invoice' | 'quotation'>('select');
  const [isSharedView, setIsSharedView] = useState<boolean>(false);

  // App workspace active tab inside editor
  const [activeTab, setActiveTab] = useState<'profile' | 'client' | 'items'>('client');
  
  // Settings profile state (persisted)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: 'A2Z Version Private Limited',
    brandName: 'DotnLott',
    registeredOfficeAddress: 'Registered Office: MIG-94, Chitra, CDA Sector-6, Cuttack, Odisha, India - 753014',
    panNumber: 'AAICA7502R',
    bankAccountName: 'A2Z Version Private Limited',
    bankAccountNumber: '926020038834928',
    ifscCode: 'UTIB0000213',
    upiId: 'a2zversion@ybl',
    documentTitle: 'Commercial Invoice',
    gstDeclaration: 'We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct. (Exempted under GST regulations - No tax collected on this document)',
    qrCodeImage: '/qr-code.png',
    applyGst: false,
    signatureImage: '',
  });

  // Client Details state
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    customerName: '',
    billingAddress: '',
    shippingAddress: '',
    sameAsBilling: true,
  });

  // Invoice variables state
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    invoiceNumber: 'DL/2026-27/001',
    dateOfIssue: new Date().toISOString().split('T')[0],
    gstType: 'intra',
    advanceAmountPaid: 0,
  });

  // Quotation variables state
  const [quotationDetails, setQuotationDetails] = useState<QuotationDetails>({
    quoteNumber: 'DL/QT/2026-27/001',
    dateOfIssue: new Date().toISOString().split('T')[0],
    validityDays: 30,
    clientNote: 'Payment Milestones & Delivery Conditions:\n1. 50% Advance Upfront payment required to kick-start the development phase.\n2. 50% Balance payment upon completion and final production launch.\n3. This price quote is valid for a period of 30 days.',
    advancePercentage: 50,
    scopeSummary: 'Workflow & automation engine specifications prepared by team DotnLott for the client. Valid standard limits apply.',
  });

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: 'Workflow Automation Setup & Consulting',
      quantity: 1,
      unitPrice: 25000,
      gstRate: 0,
      period: 'One-Time',
      discountPct: 0,
    },
  ]);

  // Profile Save Alert Status
  const [saveStatus, setSaveStatus] = useState<string>('');
  
  // Link sharing state
  const [copied, setCopied] = useState<boolean>(false);

  const isCustomQr = companyProfile.qrCodeImage && companyProfile.qrCodeImage.startsWith('data:image/');

  // Check query parameters and local auth on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Unconditionally load saved admin credentials
      const savedUser = localStorage.getItem('dotnlott_admin_username');
      const savedPass = localStorage.getItem('dotnlott_admin_password');
      if (savedUser) setNewAdminUser(savedUser);
      if (savedPass) setNewAdminPass(savedPass);

      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const typeParam = params.get('type');
      const dataParam = params.get('data');

      // Detect Shared Public View Mode
      if (viewParam === 'true' && typeParam && dataParam) {
        const decoded = deserializeData(dataParam);
        if (decoded) {
          setIsSharedView(true);
          setDocType(typeParam as 'invoice' | 'quotation');
          if (decoded.companyProfile) setCompanyProfile(decoded.companyProfile);
          if (decoded.clientDetails) setClientDetails(decoded.clientDetails);
          if (decoded.lineItems) setLineItems(decoded.lineItems);
          
          if (typeParam === 'invoice' && decoded.invoiceDetails) {
            setInvoiceDetails(decoded.invoiceDetails);
          } else if (typeParam === 'quotation' && decoded.quotationDetails) {
            setQuotationDetails(decoded.quotationDetails);
          }
          
          setIsCheckingAuth(false);
          return;
        }
      }
      
      // Standard portal auth check
      const auth = localStorage.getItem('dotnlott_invoice_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
        
        // Load settings from local storage
        const savedProfile = localStorage.getItem('dotnlott_company_profile');
        if (savedProfile) {
          try {
            setCompanyProfile(JSON.parse(savedProfile));
          } catch (e) {
            console.error('Error loading company profile', e);
          }
        }

        const lastInvoiceNum = localStorage.getItem('dotnlott_last_invoice_number');
        if (lastInvoiceNum) {
          setInvoiceDetails(prev => ({
            ...prev,
            invoiceNumber: getNextInvoiceNumber(lastInvoiceNum),
          }));
        }

        const lastQuoteNum = localStorage.getItem('dotnlott_last_quotation_number');
        if (lastQuoteNum) {
          setQuotationDetails(prev => ({
            ...prev,
            quoteNumber: getNextInvoiceNumber(lastQuoteNum),
          }));
        }
      }
      
      setIsCheckingAuth(false);
    }
  }, []);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem('dotnlott_admin_username') || 'connect@dotnlott.com';
    const savedPass = localStorage.getItem('dotnlott_admin_password') || 'Welinv123#';
    
    if (email === savedUser && (password === savedPass || (savedPass === 'Welinv123#' && password === 'Welinv123#..'))) {
      localStorage.setItem('dotnlott_invoice_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('dotnlott_invoice_authenticated');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setDocType('select');
  };

  // Save company profile manually or alert on save
  const handleSaveProfile = () => {
    localStorage.setItem('dotnlott_company_profile', JSON.stringify(companyProfile));
    setSaveStatus('Profile Saved Successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Handle local QR code image upload conversion to base64
  const handleQrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyProfile(prev => ({
          ...prev,
          qrCodeImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle local signature image upload conversion to base64
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyProfile(prev => ({
          ...prev,
          signatureImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding line item
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      gstRate: 0,
      period: 'One-Time',
      discountPct: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  // Handle removing line item
  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  // Handle changing item field
  const handleItemChange = (id: string, field: keyof LineItem, val: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: val,
        };
      }
      return item;
    }));
  };

  // Financial calculations
  const baseSubtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalDiscountGiven = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice * ((item.discountPct || 0) / 100)), 0);
  const itemsSubtotal = baseSubtotal - totalDiscountGiven;
  const totalTaxAmount = lineItems.reduce((sum, item) => {
    const base = item.quantity * item.unitPrice;
    const discount = base * ((item.discountPct || 0) / 100);
    const taxableValue = base - discount;
    return sum + (taxableValue * (item.gstRate / 100));
  }, 0);
  const grandTotal = itemsSubtotal + totalTaxAmount;

  // Breakdown tax amounts per rate for CGST, SGST, IGST
  const getTaxBreakdown = () => {
    let cgstTotal = 0;
    let sgstTotal = 0;
    let igstTotal = 0;

    lineItems.forEach(item => {
      const sub = item.quantity * item.unitPrice;
      const discount = sub * ((item.discountPct || 0) / 100);
      const taxableValue = sub - discount;
      const tax = taxableValue * (item.gstRate / 100);
      if (docType === 'invoice' && invoiceDetails.gstType === 'intra') {
        cgstTotal += tax / 2;
        sgstTotal += tax / 2;
      } else {
        igstTotal += tax;
      }
    });

    return { cgstTotal, sgstTotal, igstTotal };
  };

  const { cgstTotal, sgstTotal, igstTotal } = getTaxBreakdown();

  // Print function
  const triggerPrint = () => {
    if (docType === 'invoice') {
      localStorage.setItem('dotnlott_last_invoice_number', invoiceDetails.invoiceNumber);
    } else if (docType === 'quotation') {
      localStorage.setItem('dotnlott_last_quotation_number', quotationDetails.quoteNumber);
    }
    window.print();
  };

  // Build the state serialization for sharing
  const getShareUrl = () => {
    const payload: SharedState = {
      docType: docType as 'invoice' | 'quotation',
      companyProfile,
      clientDetails,
      lineItems,
    };
    if (docType === 'invoice') {
      payload.invoiceDetails = invoiceDetails;
    } else {
      payload.quotationDetails = quotationDetails;
    }
    const serialized = serializeData(payload);
    return `${window.location.origin}/invoice?view=true&type=${docType}&data=${serialized}`;
  };

  // Copy share URL to clipboard
  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Trigger WhatsApp share
  const handleShareWhatsApp = () => {
    const url = getShareUrl();
    const docName = docType === 'invoice' ? 'Commercial Invoice' : 'Quotation';
    const docNo = docType === 'invoice' ? invoiceDetails.invoiceNumber : quotationDetails.quoteNumber;
    const clientName = clientDetails.customerName ? ` for ${clientDetails.customerName}` : '';
    const text = `Hi, here is the ${docName} (${docNo})${clientName} from DotnLott:\n\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Reset current document
  const handleResetDocument = () => {
    setClientDetails({
      customerName: '',
      billingAddress: '',
      shippingAddress: '',
      sameAsBilling: true,
    });
    setLineItems([
      {
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        gstRate: 18,
      }
    ]);
    if (docType === 'quotation') {
      setQuotationDetails(prev => ({
        ...prev,
        clientNote: 'Payment Milestones & Delivery Conditions:\n1. 50% upfront payment required to kick-start design & coding phase.\n2. 30% payment post client approval of UI/UX layouts & database structures.\n3. 20% payment upon final staging check & production launch.\n4. This price quote is valid for a period of 30 days.',
      }));
    }
  };

  // LOADING STATE
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-brand-purple w-8 h-8" />
          <p className="text-slate-500 text-sm font-semibold font-display">Securing connection...</p>
        </div>
      </div>
    );
  }

  // SHARED PUBLIC VIEW MODE (Bypasses Login Guard)
  if (isSharedView) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col relative overflow-x-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-[140px] pointer-events-none" />

        {/* Global styles block for printable page wrapper */}
        <style jsx global>{`
          @media print {
            header, 
            footer, 
            nav, 
            .no-print, 
            .whatsapp-btn,
            .scroll-to-top,
            aside,
            button,
            .top-actions-bar {
              display: none !important;
            }
            html, body {
              background-color: #ffffff !important;
              color: #000000 !important;
              font-family: 'Inter', sans-serif !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: auto !important;
              min-height: auto !important;
            }
            main, 
            .flex-grow, 
            .max-w-7xl, 
            .sticky, 
            .lg\:w-\[55\%\] {
              display: block !important;
              position: static !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              height: auto !important;
              min-height: auto !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
            .preview-scroll-container {
              overflow: visible !important;
              width: auto !important;
              max-width: none !important;
            }
            .print-wrapper {
              position: relative !important;
              width: 100% !important;
              max-width: 210mm !important;
              height: auto !important;
              min-height: auto !important;
              padding: 8mm !important;
              background: #ffffff !important;
              border: none !important;
              box-shadow: none !important;
              margin: 0 auto !important;
              color: #000000 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .invoice-table th {
              background-color: #f1f5f9 !important;
              color: #0f172a !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .invoice-table tr {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .no-break {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          }
          @page {
            size: A4;
            margin: 0;
          }
        `}</style>

        {/* Client Top Actions Bar */}
        <div className="top-actions-bar no-print border-b border-slate-200 bg-white/85 backdrop-blur-md px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between z-10 shadow-sm">
          <div className="text-center sm:text-left">
            <h2 className="text-sm font-bold tracking-tight text-slate-800 font-display">DotnLott Secure Vault</h2>
            <p className="text-[10px] text-slate-500">Official {docType === 'invoice' ? 'Commercial Invoice' : 'Price Quotation'}</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-md shadow-brand-purple/10 hover:brightness-110 active:scale-[0.98] w-full sm:w-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              Download / Print PDF
            </button>
          </div>
        </div>

        {/* A4 Center Container */}
        <div className="flex-grow flex flex-col items-center justify-start p-4 sm:p-8 pb-16 overflow-y-auto z-10 bg-slate-50 w-full">


          <div className="w-full max-w-[794px] flex justify-center pb-12">
            <div className="w-[794px] shadow-xl shadow-slate-200/50 rounded-xl border border-slate-200/60 bg-white overflow-hidden mt-0 mb-8 responsive-zoom-preview">
              <div className="print-wrapper w-full min-h-[297mm] bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between select-text">
              
              {/* Header: Brand & Issuer Details */}
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center bg-white border border-slate-150 rounded p-1 shadow-sm">
                        <Image src="/logo-v2.png" alt="Logo" width={24} height={24} className="object-contain" />
                      </div>
                      <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                        {companyProfile.brandName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed max-w-sm">
                      <p className="font-bold text-slate-800">{companyProfile.companyName}</p>
                      <p className="whitespace-pre-wrap">{companyProfile.registeredOfficeAddress}</p>
                      <p className="font-semibold text-slate-700 mt-1">PAN: {companyProfile.panNumber}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-800 uppercase font-display">
                      {docType === 'invoice' ? companyProfile.documentTitle : 'Quotation'}
                    </h1>
                    <div className="text-[11px] text-slate-600 pt-1">
                      {docType === 'invoice' ? (
                        <>
                          <p><span className="font-semibold text-slate-700">Invoice No:</span> {invoiceDetails.invoiceNumber}</p>
                          <p><span className="font-semibold text-slate-700">Date of Issue:</span> {invoiceDetails.dateOfIssue}</p>
                        </>
                      ) : (
                        <>
                          <p><span className="font-semibold text-slate-700">Quote Ref:</span> {quotationDetails.quoteNumber}</p>
                          <p><span className="font-semibold text-slate-700">Quote Date:</span> {quotationDetails.dateOfIssue}</p>
                          <p><span className="font-semibold text-slate-700">Validity:</span> {quotationDetails.validityDays} Days (Until {calculateExpiryDate(quotationDetails.dateOfIssue, quotationDetails.validityDays)})</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client / Bill addresses */}
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Bill To:</span>
                    <div className="text-slate-800 leading-relaxed">
                      <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                      <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                    </div>
                  </div>

                  {docType === 'invoice' ? (
                    <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ship To:</span>
                      <div className="text-slate-800 leading-relaxed">
                        {clientDetails.sameAsBilling ? (
                          <>
                            <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                            <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                            <p className="whitespace-pre-wrap mt-1">{clientDetails.shippingAddress || '—'}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Proposal Scope Summary:</p>
                      <p className="text-slate-700 leading-relaxed">{quotationDetails?.scopeSummary || `Workflow & automation engine specifications prepared by team ${companyProfile.brandName} for ${clientDetails.customerName || 'the client'}. Valid standard limits apply.`}</p>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="invoice-table w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                        <th className="py-2.5 px-3 w-12 text-center">#</th>
                        <th className="py-2.5 px-3">Description of Service</th>
                        <th className="py-2.5 px-3 text-center w-16">Qty</th>
                        <th className="py-2.5 px-3 text-right w-24">Unit Price</th>
                        {totalTaxAmount > 0 && <th className="py-2.5 px-3 text-center w-16">GST (%)</th>}
                        <th className="py-2.5 px-3 text-right w-28">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {lineItems.map((item, idx) => {
                        const baseAmount = item.quantity * item.unitPrice;
                        const discountAmt = baseAmount * ((item.discountPct || 0) / 100);
                        const amount = baseAmount - discountAmt;
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-3 text-center text-slate-500">{idx + 1}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900 whitespace-pre-wrap">
                              <div>{item.description || '—'}</div>
                              {(item.period || (item.discountPct || 0) > 0) && (
                                <div className="text-[9px] text-slate-400 mt-0.5 font-normal flex items-center gap-2">
                                  {item.period && (
                                    <span>Period: <span className="font-semibold text-slate-550">{item.period}</span></span>
                                  )}
                                  {item.period && (item.discountPct || 0) > 0 && <span className="text-slate-300">|</span>}
                                  {(item.discountPct || 0) > 0 && (
                                    <span className="text-emerald-600 font-medium">Discount: {item.discountPct}% Off</span>
                                  )}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                            <td className="py-2.5 px-3 text-right">
                              {(item.discountPct || 0) > 0 ? (
                                <div>
                                  <span className="text-slate-400 line-through text-[9px] mr-1">{formatIndianCurrency(item.unitPrice)}</span>
                                  <span>{formatIndianCurrency(item.unitPrice * (1 - (item.discountPct || 0) / 100))}</span>
                                </div>
                              ) : (
                                formatIndianCurrency(item.unitPrice)
                              )}
                            </td>
                            {totalTaxAmount > 0 && <td className="py-2.5 px-3 text-center">{item.gstRate}%</td>}
                            <td className="py-2.5 px-3 text-right font-semibold text-slate-900">{formatIndianCurrency(amount)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Total Amount in Words (Full Width, Single Row) */}
                <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-150 rounded-lg text-[10px] mt-4">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Total Amount in Words:</span>
                  <span className="font-semibold text-slate-800 italic">{numberToIndianWords(grandTotal)}</span>
                </div>

                {/* Calculations & Instructions Side-by-Side */}
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-7 space-y-4">
                    {docType === 'invoice' ? (
                      <div className="p-3.5 border border-emerald-200 bg-emerald-50/40 rounded-lg text-emerald-800 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          Payment Status: PAID
                        </div>
                        <p className="text-[9px] text-emerald-700 leading-relaxed font-medium">
                          Payment has been successfully received and processed. Thank you for your business!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-[10px] border border-slate-200 p-3 rounded-lg bg-slate-50/50 animate-fade-in">
                        <p className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          UPI Payment Option
                        </p>
                        <div className="flex flex-col items-center gap-2 pt-1.5 text-center">
                          {companyProfile.qrCodeImage && (
                            <div className="w-20 h-20 overflow-hidden border border-slate-200 rounded-lg p-1 bg-white flex items-center justify-center relative shadow-sm">
                              <img 
                                src={companyProfile.qrCodeImage} 
                                alt="UPI QR Code" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                          )}
                          <div className="text-[10px] text-slate-750 font-medium leading-relaxed">
                            Scan QR Code or pay to UPI:
                            <p className="font-bold text-brand-purple text-xs mt-0.5 select-all">{companyProfile.upiId || 'a2zversion@ybl'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-5 flex flex-col justify-end text-[11px] space-y-2 no-break">
                    {totalDiscountGiven > 0 ? (
                      <>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>Subtotal (Pre-Discount):</span>
                          <span className="font-medium">{formatIndianCurrency(baseSubtotal)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-600 font-bold">
                          <span>Total Discount Given:</span>
                          <span>-{formatIndianCurrency(totalDiscountGiven)}</span>
                        </div>
                        {companyProfile.applyGst ? (
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>Taxable Value:</span>
                            <span className="font-semibold text-slate-800">{formatIndianCurrency(itemsSubtotal)}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>Subtotal:</span>
                            <span className="font-semibold text-slate-800">{formatIndianCurrency(itemsSubtotal)}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                        <span>Subtotal:</span>
                        <span className="font-medium">{formatIndianCurrency(itemsSubtotal)}</span>
                      </div>
                    )}

                    {companyProfile.applyGst && totalTaxAmount > 0 ? (
                      docType === 'invoice' && invoiceDetails.gstType === 'intra' ? (
                        <>
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>CGST:</span>
                            <span className="font-medium">{formatIndianCurrency(cgstTotal)}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>SGST:</span>
                            <span className="font-medium">{formatIndianCurrency(sgstTotal)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>IGST:</span>
                          <span className="font-medium">{formatIndianCurrency(igstTotal)}</span>
                        </div>
                      )
                    ) : (
                      !companyProfile.applyGst && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>Taxes & Duties:</span>
                          <span className="font-semibold text-slate-500">Nil / Exempt</span>
                        </div>
                      )
                    )}

                    {companyProfile.applyGst && totalTaxAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                        <span>Total GST:</span>
                        <span className="font-medium">{formatIndianCurrency(totalTaxAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-2 text-slate-900 font-bold bg-slate-100 px-3 rounded-lg text-xs">
                      <span>Grand Total:</span>
                      <span>{formatIndianCurrency(grandTotal)}</span>
                    </div>

                    {docType === 'invoice' && (invoiceDetails.advanceAmountPaid || 0) > 0 && (
                      <>
                        <div className="flex justify-between py-1.5 px-3 text-slate-600 border-b border-slate-100 text-[10px] font-medium mt-1">
                          <span>Less: Advance Paid:</span>
                          <span className="text-slate-500">-{formatIndianCurrency(invoiceDetails.advanceAmountPaid || 0)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-brand-blue font-extrabold bg-blue-50/50 px-3 rounded-lg text-xs mt-1 border border-blue-100/50">
                          <span>Balance Due:</span>
                          <span>{formatIndianCurrency(Math.max(0, grandTotal - (invoiceDetails.advanceAmountPaid || 0)))}</span>
                        </div>
                      </>
                    )}

                    {docType === 'quotation' && (quotationDetails.advancePercentage || 0) > 0 && (
                      <>
                        <div className="flex justify-between py-1.5 px-3 text-slate-600 border-b border-slate-100 text-[10px] font-medium mt-1">
                          <span>Advance Payable ({quotationDetails.advancePercentage}%):</span>
                          <span className="text-slate-800 font-bold">{formatIndianCurrency(grandTotal * (quotationDetails.advancePercentage || 0) / 100)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-brand-purple font-extrabold bg-purple-50/50 px-3 rounded-lg text-xs mt-1 border border-purple-100/50">
                          <span>Balance on Completion ({100 - (quotationDetails.advancePercentage || 0)}%):</span>
                          <span>{formatIndianCurrency(grandTotal * (1 - (quotationDetails.advancePercentage || 0) / 100))}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Milestones & Proposal Notes (Full Width, Bottom) */}
                {docType === 'quotation' && (
                  <div className="mt-4 space-y-1.5 text-[10px] border border-slate-200 p-3 rounded-lg bg-indigo-50/10">
                    <p className="font-bold text-brand-purple uppercase tracking-wider border-b border-purple-100 pb-1">
                      Payment Milestones & Proposal Notes
                    </p>
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-700 font-medium font-display">
                      {quotationDetails.clientNote || '—'}
                    </p>
                  </div>
                )}
              </div>

                {/* Our Services Banner */}
                <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">Our Core Capabilities & Services</p>
                  <div className="flex justify-center items-center gap-4 text-[9px]">
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                      AI Tools Integration
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                      Business Automation
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Website Development
                    </span>
                  </div>
                </div>

                {/* Signatures & Declarations */}
                <div className="mt-3 border-t border-slate-200 pt-3 space-y-3 no-break">
                  <div className="grid grid-cols-12 gap-4 text-[10px] items-end">
                  <div className={`${docType === 'invoice' ? 'col-span-8' : 'col-span-12'} space-y-0.5 text-slate-500`}>
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-[8px]">Declaration / Conditions:</p>
                    <p className="leading-relaxed whitespace-pre-wrap text-[8.5px] text-slate-500">
                      {docType === 'invoice' 
                        ? companyProfile.gstDeclaration 
                        : 'This document constitutes a business proposal estimate. Actual invoices will match finalized scopes. Standard terms apply.'}
                    </p>
                  </div>

                  {docType === 'invoice' && (
                    <div className="col-span-4 text-center flex flex-col justify-end min-h-[50px]">
                      <div className="text-slate-800 mb-1">
                        <p className="font-bold text-[9px] text-slate-500 uppercase tracking-wider">For {companyProfile.companyName}</p>
                      </div>
                      <div className="h-10 flex items-center justify-center relative">
                        {companyProfile.signatureImage ? (
                          <img 
                            src={companyProfile.signatureImage} 
                            alt="CEO Signature" 
                            className="max-h-10 max-w-[100px] object-contain animate-fade-in" 
                          />
                        ) : (
                          <div className="h-10" />
                        )}
                      </div>
                      <div className="border-t border-slate-300 pt-1.5 mt-1">
                        <p className="font-semibold text-slate-700 font-display">Authorized Signatory</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  // ADMIN LOGIN PORTAL
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f8fafc] py-12 relative overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-blue/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl shadow-slate-100 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-brand-purple/5 border border-brand-purple/10 rounded-xl mb-4 text-brand-purple">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">Invoice Portal</h1>
            <p className="text-slate-500 text-sm mt-2">Access restricted to authorized team members</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Username / Email</label>
              <input
                type="text"
                required
                readOnly={isUserReadOnly}
                onFocus={() => setIsUserReadOnly(false)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type ID..."
                className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-4 py-3 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  readOnly={isPassReadOnly}
                  onFocus={() => setIsPassReadOnly(false)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type Password..."
                  style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' } as React.CSSProperties}
                  className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg pl-4 pr-10 py-3 text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-650 text-xs font-medium bg-red-55/60 border border-red-200 rounded-lg p-3"
              >
                {authError}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold text-sm rounded-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-brand-purple/10"
            >
              Sign In to Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // PORTAL SELECTION DASHBOARD
  if (docType === 'select') {
    return (
      <div className="min-h-[70vh] bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-start pt-6 pb-12 px-6 relative overflow-hidden select-none">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-[140px] pointer-events-none" />

        {/* Dash contents - Top Aligned */}
        <div className="max-w-4xl w-full text-center space-y-8 relative z-10 pt-4">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              DotnLott Operations Portal
            </h1>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Choose a generator tool below to create client-facing documentation with automatic GST calculation.
            </p>
            {/* Inline Logout Button to avoid absolute overlap on mobile */}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-slate-505 hover:text-red-500 border border-slate-200 hover:border-red-200 bg-white hover:bg-red-50/10 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout Portal
              </button>
            </div>
          </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
              {/* Quotation Card */}
              <motion.div
                whileHover={{ scale: 1.02, translateY: -4 }}
                onClick={() => {
                  setDocType('quotation');
                  setActiveTab('client');
                }}
                className="bg-white border border-slate-200 hover:border-brand-purple/35 p-8 rounded-2xl cursor-pointer text-left transition-all duration-300 group shadow-sm hover:shadow-md hover:shadow-brand-purple/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple/10 transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-purple transition-colors font-display">
                    Quotation Generator
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Design business proposals and custom price quotes. Includes validity periods and customizable notes to outline delivery milestones or project terms.
                  </p>
                </div>
                <div className="mt-8 flex items-center text-xs font-bold text-brand-purple uppercase tracking-wider gap-1">
                  Build Quotation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Invoice Card */}
              <motion.div
                whileHover={{ scale: 1.02, translateY: -4 }}
                onClick={() => {
                  setDocType('invoice');
                  setActiveTab('client');
                }}
                className="bg-white border border-slate-200 hover:border-brand-blue/35 p-8 rounded-2xl cursor-pointer text-left transition-all duration-300 group shadow-sm hover:shadow-md hover:shadow-brand-blue/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/10 transition-colors">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors font-display">
                    Invoice Generator
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Generate formal commercial and sales invoices. Includes IGST/CGST/SGST tax treatments, customer shipping addresses, and direct bank account payment instructions.
                  </p>
                </div>
                <div className="mt-8 flex items-center text-xs font-bold text-brand-blue uppercase tracking-wider gap-1">
                  Build Invoice
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

  // ACTIVE GENERATOR ENVIRONMENT (Invoice / Quotation Editor + Live Preview)
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Styled block injection for printing */}
      <style jsx global>{`
        @media print {
          * {
            overflow: visible !important;
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          *::-webkit-scrollbar {
            display: none !important;
          }
          header, 
          footer, 
          nav, 
          .no-print, 
          .whatsapp-btn,
          .scroll-to-top,
          aside,
          button,
          .dashboard-hdr {
            display: none !important;
          }
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Inter', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
          }
          main, 
          .flex-grow, 
          .max-w-7xl, 
          .sticky, 
          .lg\:w-\[55\%\] {
            display: block !important;
            position: static !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .responsive-zoom-preview {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            border-radius: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-wrapper {
            position: relative !important;
            width: 100% !important;
            max-width: 190mm !important;
            height: auto !important;
            min-height: auto !important;
            padding: 6mm 6mm !important;
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
            margin: 8mm auto 0 auto !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-table th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-table tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .no-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
        @media screen and (min-width: 1024px) and (max-width: 1200px) {
          .responsive-zoom-preview {
            zoom: 0.72;
          }
        }
        @media screen and (min-width: 1201px) and (max-width: 1400px) {
          .responsive-zoom-preview {
            zoom: 0.85;
          }
        }
        @media screen and (max-width: 840px) {
          .responsive-zoom-preview {
            zoom: 0.95;
          }
        }
        @media screen and (max-width: 768px) {
          .responsive-zoom-preview {
            zoom: 0.88;
          }
        }
        @media screen and (max-width: 640px) {
          .responsive-zoom-preview {
            zoom: 0.72;
          }
        }
        @media screen and (max-width: 480px) {
          .responsive-zoom-preview {
            zoom: 0.52;
          }
        }
        @media screen and (max-width: 380px) {
          .responsive-zoom-preview {
            zoom: 0.42;
          }
        }
        @media screen and (max-width: 320px) {
          .responsive-zoom-preview {
            zoom: 0.35;
          }
        }
      `}</style>

      {/* Top Header */}
      <div className="dashboard-hdr no-print border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between z-10 shadow-sm">
        <div className="text-center sm:text-left">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-2 font-display">
            DotnLott {docType === 'invoice' ? 'Invoice' : 'Quotation'} Panel
          </h2>
          <p className="text-[10px] text-slate-500">Configure and preview company documentation</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={() => setDocType('select')}
            className="flex items-center justify-center gap-1.5 text-slate-650 hover:text-slate-900 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm flex-1 sm:flex-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1 text-slate-500 hover:text-red-500 hover:border-red-200 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm flex-1 sm:flex-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6 max-w-7xl w-full mx-auto p-4 sm:p-6 z-10">
        
        {/* Left Form controls */}
        <div className="no-print w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            
            {/* Form tab selector */}
            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200 mb-6 w-full">
              <button
                onClick={() => setActiveTab('client')}
                className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-1 text-[10px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'client' 
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5 flex-shrink-0" />
                Customer & Config
              </button>
              <button
                onClick={() => setActiveTab('items')}
                className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-1 text-[10px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'items' 
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                Line Items
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-1 text-[10px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'profile' 
                    ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building className="w-3.5 h-3.5 flex-shrink-0" />
                Company & Settings
              </button>
            </div>

            {/* Tab view */}
            <div>
              {activeTab === 'client' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5 font-display">
                    <span>1. Reference Details</span>
                  </h3>
                  
                  {docType === 'invoice' ? (
                    // INVOICE METADATA FORM
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Invoice No <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={invoiceDetails.invoiceNumber}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNumber: e.target.value})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date of Issue <span className="text-red-500">*</span></label>
                          <input
                            type="date"
                            value={invoiceDetails.dateOfIssue}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, dateOfIssue: e.target.value})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      {companyProfile.applyGst && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">GST Treatment <span className="text-red-500">*</span></label>
                          <select
                            value={invoiceDetails.gstType}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, gstType: e.target.value as 'intra' | 'inter'})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all cursor-pointer"
                          >
                            <option value="intra">Intra-State (CGST + SGST) - In Odisha Billing</option>
                            <option value="inter">Inter-State (IGST) - Outside Odisha Billing</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Advance Paid Amount (₹)</label>
                        <input
                          type="number"
                          min="0"
                          value={invoiceDetails.advanceAmountPaid || ''}
                          onChange={(e) => setInvoiceDetails({...invoiceDetails, advanceAmountPaid: parseFloat(e.target.value) || 0})}
                          placeholder="e.g. 12500"
                          className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    // QUOTATION METADATA FORM
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quote Ref No <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={quotationDetails.quoteNumber}
                            onChange={(e) => setQuotationDetails({...quotationDetails, quoteNumber: e.target.value})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Quote Date <span className="text-red-500">*</span></label>
                          <input
                            type="date"
                            value={quotationDetails.dateOfIssue}
                            onChange={(e) => setQuotationDetails({...quotationDetails, dateOfIssue: e.target.value})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Validity Days <span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            value={quotationDetails.validityDays === 0 ? '' : quotationDetails.validityDays}
                            onChange={(e) => setQuotationDetails({...quotationDetails, validityDays: parseInt(e.target.value, 10) || 0})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Advance Payment Target (%) <span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={quotationDetails.advancePercentage === 0 ? '' : quotationDetails.advancePercentage}
                            onChange={(e) => setQuotationDetails({...quotationDetails, advancePercentage: parseInt(e.target.value, 10) || 0})}
                            placeholder="e.g. 50"
                            className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Proposal Scope Summary</label>
                        <textarea
                          rows={2}
                          value={quotationDetails.scopeSummary || ''}
                          onChange={(e) => setQuotationDetails({...quotationDetails, scopeSummary: e.target.value})}
                          placeholder="Describe the scope of services..."
                          className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}

                  <hr className="border-slate-100 my-4" />
                  
                  <h3 className="text-sm font-bold text-slate-800 mb-2 font-display">2. Client Billing Details</h3>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Customer Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp Inc."
                      value={clientDetails.customerName}
                      onChange={(e) => setClientDetails({...clientDetails, customerName: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Billing Address <span className="text-red-500">*</span></label>
                    <textarea
                      placeholder="Enter billing address here..."
                      rows={3}
                      value={clientDetails.billingAddress}
                      onChange={(e) => {
                        const addr = e.target.value;
                        setClientDetails({
                          ...clientDetails,
                          billingAddress: addr,
                          shippingAddress: clientDetails.sameAsBilling ? addr : clientDetails.shippingAddress
                        });
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  {docType === 'invoice' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-1.5 bg-slate-50 px-3 rounded-lg border border-slate-100">
                        <span className="text-xs font-semibold text-slate-700">Shipping same as Billing</span>
                        <button
                          type="button"
                          onClick={() => {
                            const nextVal = !clientDetails.sameAsBilling;
                            setClientDetails({
                              ...clientDetails,
                              sameAsBilling: nextVal,
                              shippingAddress: nextVal ? clientDetails.billingAddress : ''
                            });
                          }}
                          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                            clientDetails.sameAsBilling ? 'bg-brand-blue' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              clientDetails.sameAsBilling ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {!clientDetails.sameAsBilling && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-1.5"
                        >
                          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Shipping Address <span className="text-red-500">*</span></label>
                          <textarea
                            placeholder="Enter shipping address here..."
                            rows={3}
                            value={clientDetails.shippingAddress}
                            onChange={(e) => setClientDetails({...clientDetails, shippingAddress: e.target.value})}
                            className="w-full bg-white border border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-none"
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {docType === 'quotation' && (
                    <div className="space-y-1.5">
                      <hr className="border-slate-100 my-4" />
                      <label className="block text-[11px] font-bold text-brand-purple uppercase tracking-wider mb-1">
                        3. Proposal Note (Specifications for Client)
                      </label>
                      <textarea
                        placeholder="Specify payment milestones, timeline constraints, or details..."
                        rows={4}
                        value={quotationDetails.clientNote}
                        onChange={(e) => setQuotationDetails({...quotationDetails, clientNote: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-y"
                      />
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'items' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 font-display">Line Items List</h3>
                    <button
                      onClick={addLineItem}
                      className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        docType === 'invoice' ? 'bg-brand-blue hover:bg-brand-blue/90' : 'bg-brand-purple hover:bg-brand-purple/90'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Service / Item
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {lineItems.map((item, index) => (
                      <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400">Item #{index + 1}</span>
                          {lineItems.length > 1 && (
                            <button
                              onClick={() => removeLineItem(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">Description / Services <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            placeholder="e.g. Website development or SEO audit"
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">Quantity <span className="text-red-500">*</span></label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity === 0 ? '' : item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                              className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">Billing Period <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              value={item.period || ''}
                              onChange={(e) => handleItemChange(item.id, 'period', e.target.value)}
                              placeholder="e.g. 1 Month or One-Time"
                              className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">Unit Price (₹) <span className="text-red-500">*</span></label>
                            <input
                              type="number"
                              min="0"
                              value={item.unitPrice === 0 ? '' : item.unitPrice}
                              onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">Discount (%) <span className="text-red-500">*</span></label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.discountPct === 0 ? '' : item.discountPct}
                              onChange={(e) => handleItemChange(item.id, 'discountPct', parseInt(e.target.value, 10) || 0)}
                              placeholder="e.g. 10"
                              className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                            />
                          </div>

                          {companyProfile.applyGst && (
                            <div className="col-span-1 sm:col-span-2">
                              <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1">GST Rate (%) <span className="text-red-500">*</span></label>
                              <select
                                value={item.gstRate}
                                onChange={(e) => handleItemChange(item.id, 'gstRate', parseInt(e.target.value, 10) || 0)}
                                className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all cursor-pointer"
                              >
                                <option value="0">0% (GST Exempt)</option>
                                <option value="5">5%</option>
                                <option value="12">12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 font-display">Company Profile (Persisted)</h3>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display">Apply GST / Tax Columns</h4>
                      <p className="text-[9px] text-slate-500 leading-normal">Enable tax calculations, splits, and rates in forms and sheets</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={companyProfile.applyGst || false} 
                        onChange={(e) => setCompanyProfile({...companyProfile, applyGst: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-purple"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Official Company Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={companyProfile.companyName}
                      onChange={(e) => setCompanyProfile({...companyProfile, companyName: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Brand Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={companyProfile.brandName}
                      onChange={(e) => setCompanyProfile({...companyProfile, brandName: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Registered Office Address <span className="text-red-500">*</span></label>
                    <textarea
                      rows={2}
                      value={companyProfile.registeredOfficeAddress}
                      onChange={(e) => setCompanyProfile({...companyProfile, registeredOfficeAddress: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">PAN / CIN Number <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={companyProfile.panNumber}
                        onChange={(e) => setCompanyProfile({...companyProfile, panNumber: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Document Title (Invoice) <span className="text-red-500">*</span></label>
                      <select
                        value={companyProfile.documentTitle}
                        onChange={(e) => setCompanyProfile({...companyProfile, documentTitle: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Commercial Invoice">Commercial Invoice</option>
                        <option value="Sales Invoice">Sales Invoice</option>
                        <option value="Tax Invoice">Tax Invoice</option>
                      </select>
                    </div>
                  </div>

                  <hr className="border-slate-100 my-2" />
                  <h4 className="text-xs font-bold text-slate-800 font-display">Bank Account & Payment Details</h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bank Account Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={companyProfile.bankAccountName}
                      onChange={(e) => setCompanyProfile({...companyProfile, bankAccountName: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Account Number</label>
                      <input
                        type="text"
                        value={companyProfile.bankAccountNumber}
                        onChange={(e) => setCompanyProfile({...companyProfile, bankAccountNumber: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">IFSC Code</label>
                      <input
                        type="text"
                        value={companyProfile.ifscCode}
                        onChange={(e) => setCompanyProfile({...companyProfile, ifscCode: e.target.value})}
                        className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">UPI ID <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={companyProfile.upiId}
                      onChange={(e) => setCompanyProfile({...companyProfile, upiId: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">QR Scanner Image <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 border border-slate-200 rounded-lg">
                      {companyProfile.qrCodeImage ? (
                        <img 
                          src={companyProfile.qrCodeImage} 
                          alt="QR Code" 
                          className="w-12 h-12 object-contain border border-slate-200 rounded bg-white p-0.5 shadow-sm animate-fade-in" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded border border-dashed border-slate-300 bg-white flex items-center justify-center text-[9px] text-slate-400 font-semibold">No QR</div>
                      )}
                      <div className="flex-grow flex flex-col gap-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleQrCodeChange}
                          className="text-[10px] text-slate-500 file:mr-2.5 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-brand-purple/5 file:text-brand-purple hover:file:bg-brand-purple/10 cursor-pointer"
                        />
                        <p className="text-[9px] text-slate-400">Select scanner image file (PNG/JPG)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">CEO Signature Image <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 border border-slate-200 rounded-lg">
                      {companyProfile.signatureImage ? (
                        <img 
                          src={companyProfile.signatureImage} 
                          alt="Signature Preview" 
                          className="w-16 h-8 object-contain border border-slate-200 rounded bg-white p-0.5 shadow-sm animate-fade-in" 
                        />
                      ) : (
                        <div className="w-16 h-8 rounded border border-dashed border-slate-300 bg-white flex items-center justify-center text-[9px] text-slate-400 font-semibold">No Sign</div>
                      )}
                      <div className="flex-grow flex flex-col gap-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureChange}
                          className="text-[10px] text-slate-500 file:mr-2.5 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-brand-purple/5 file:text-brand-purple hover:file:bg-brand-purple/10 cursor-pointer"
                        />
                        <p className="text-[9px] text-slate-400">Select signature image file (PNG/JPG)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      {companyProfile.applyGst ? 'GST Declaration Text' : 'Invoice Declaration Text'} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={companyProfile.gstDeclaration}
                      onChange={(e) => setCompanyProfile({...companyProfile, gstDeclaration: e.target.value})}
                      className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="w-full py-2.5 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all cursor-pointer shadow-md shadow-brand-purple/10"
                    >
                      Save Company Profile (Persist)
                    </button>
                    {saveStatus && saveStatus.includes('Profile') && (
                      <p className="text-[11px] font-semibold text-emerald-650 flex items-center justify-center gap-1.5 mt-0.5 animate-fade-in">
                        <Check className="w-3.5 h-3.5" />
                        {saveStatus}
                      </p>
                    )}
                  </div>

                  <hr className="border-slate-200 my-6" />

                  {/* Portal Login Credentials Update section */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold text-slate-800 font-display flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-brand-purple" />
                      Internal Portal Credentials Settings
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Update the username and password used to access this admin panel. These values are saved to your local browser storage.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">New Login ID <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={newAdminUser}
                          onChange={(e) => setNewAdminUser(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">New Password <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={newAdminPass}
                          onChange={(e) => setNewAdminPass(e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-800 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          localStorage.setItem('dotnlott_admin_username', newAdminUser);
                          localStorage.setItem('dotnlott_admin_password', newAdminPass);
                          setSaveStatus('Credentials Updated successfully!');
                          setTimeout(() => setSaveStatus(''), 3000);
                        }}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Update Portal Credentials
                      </button>
                      {saveStatus && saveStatus.includes('Credentials') && (
                        <p className="text-[11px] font-semibold text-emerald-650 flex items-center justify-center gap-1.5 mt-0.5 animate-fade-in">
                          <Check className="w-3.5 h-3.5" />
                          {saveStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleResetDocument}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-650 font-semibold text-xs rounded-lg hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                Clear Form
              </button>
              
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-650 hover:text-slate-900 font-semibold text-xs rounded-lg hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Link Copied!' : 'Copy Share Link'}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-750/10 active:scale-[0.98]"
              >
                <Share2 className="w-4 h-4" />
                Share via WhatsApp
              </button>

              <button
                onClick={triggerPrint}
                className="flex-1 py-3 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-500 text-xs flex flex-col gap-2">
            <p className="font-semibold text-slate-700">💡 Sharing & Printing Guidelines:</p>
            <ul className="list-disc pl-4 space-y-1 leading-relaxed">
              <li><b>WhatsApp Link</b> encodes current details. Recipients bypass authentication to view a secure read-only page.</li>
              <li>When printing to PDF, check <b>"Save as PDF"</b>, uncheck headers/footers, and set Margins to <b>"None"</b>.</li>
            </ul>
          </div>
        </div>

        {/* Right Side live print page visualizer */}
        <div className="w-full lg:w-[55%] flex flex-col items-center">


          <div className="w-full max-w-[794px] flex justify-center items-start no-print sticky top-28 mb-16 pb-12">
            <div className="w-[794px] shadow-xl rounded-xl border border-slate-200 bg-white overflow-hidden mt-0 mb-8 responsive-zoom-preview">
              <div className="no-print w-full bg-slate-100 px-4 py-2.5 flex justify-between items-center text-xs text-slate-500 border-b border-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className={`w-2 h-2 rounded-full ${docType === 'invoice' ? 'bg-brand-blue' : 'bg-brand-purple'}`} />
                  Live {docType === 'invoice' ? 'Invoice' : 'Quotation'} Preview (A4 Paper Layout)
                </span>
                <span>210mm × 297mm</span>
              </div>

              {/* Print wrapper simulation */}
              <div className="print-wrapper w-full min-h-[297mm] bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between select-text">
              
              {/* Top Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center bg-white border border-slate-150 rounded p-1 shadow-sm">
                        <Image src="/logo-v2.png" alt="Logo" width={24} height={24} className="object-contain" />
                      </div>
                      <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                        {companyProfile.brandName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed max-w-sm">
                      <p className="font-bold text-slate-800">{companyProfile.companyName}</p>
                      <p className="whitespace-pre-wrap">{companyProfile.registeredOfficeAddress}</p>
                      <p className="font-semibold text-slate-700 mt-1">PAN: {companyProfile.panNumber}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-800 uppercase font-display">
                      {docType === 'invoice' ? companyProfile.documentTitle : 'Quotation'}
                    </h1>
                    <div className="text-[11px] text-slate-600 pt-1">
                      {docType === 'invoice' ? (
                        <>
                          <p><span className="font-semibold text-slate-700">Invoice No:</span> {invoiceDetails.invoiceNumber}</p>
                          <p><span className="font-semibold text-slate-700">Date of Issue:</span> {invoiceDetails.dateOfIssue}</p>
                        </>
                      ) : (
                        <>
                          <p><span className="font-semibold text-slate-700">Quote Ref:</span> {quotationDetails.quoteNumber}</p>
                          <p><span className="font-semibold text-slate-700">Quote Date:</span> {quotationDetails.dateOfIssue}</p>
                          <p><span className="font-semibold text-slate-700">Validity:</span> {quotationDetails.validityDays} Days (Until {calculateExpiryDate(quotationDetails.dateOfIssue, quotationDetails.validityDays)})</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Bill To:</span>
                    <div className="text-slate-800 leading-relaxed">
                      <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                      <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                    </div>
                  </div>

                  {docType === 'invoice' ? (
                    <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ship To:</span>
                      <div className="text-slate-800 leading-relaxed">
                        {clientDetails.sameAsBilling ? (
                          <>
                            <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                            <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                            <p className="whitespace-pre-wrap mt-1">{clientDetails.shippingAddress || '—'}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 p-2 bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Proposal Scope Summary:</p>
                      <p className="text-slate-700 leading-relaxed">{quotationDetails.scopeSummary || `Workflow & automation engine specifications prepared by team ${companyProfile.brandName} for ${clientDetails.customerName || 'the client'}. Valid standard limits apply.`}</p>
                    </div>
                  )}
                </div>

                {/* Items list */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="invoice-table w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                        <th className="py-2.5 px-3 w-12 text-center">#</th>
                        <th className="py-2.5 px-3">Description of Service</th>
                        <th className="py-2.5 px-3 text-center w-16">Qty</th>
                        <th className="py-2.5 px-3 text-right w-24">Unit Price</th>
                        {totalTaxAmount > 0 && <th className="py-2.5 px-3 text-center w-16">GST (%)</th>}
                        <th className="py-2.5 px-3 text-right w-28">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {lineItems.map((item, idx) => {
                         const baseAmount = item.quantity * item.unitPrice;
                         const discountAmt = baseAmount * ((item.discountPct || 0) / 100);
                         const amount = baseAmount - discountAmt;
                         return (
                           <tr key={item.id} className="hover:bg-slate-50/50 text-slate-700">
                             <td className="py-2.5 px-3 text-center text-slate-500">{idx + 1}</td>
                             <td className="py-2.5 px-3 font-medium text-slate-900 whitespace-pre-wrap">
                               <div>{item.description || '—'}</div>
                               {(item.period || (item.discountPct || 0) > 0) && (
                                 <div className="text-[9px] text-slate-400 mt-0.5 font-normal flex items-center gap-2">
                                   {item.period && (
                                     <span>Period: <span className="font-semibold text-slate-550">{item.period}</span></span>
                                   )}
                                   {item.period && (item.discountPct || 0) > 0 && <span className="text-slate-350">|</span>}
                                   {(item.discountPct || 0) > 0 && (
                                     <span className="text-emerald-600 font-medium">Discount: {item.discountPct}% Off</span>
                                   )}
                                 </div>
                               )}
                             </td>
                             <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                             <td className="py-2.5 px-3 text-right">
                               {(item.discountPct || 0) > 0 ? (
                                 <div>
                                   <span className="text-slate-400 line-through text-[9px] mr-1">{formatIndianCurrency(item.unitPrice)}</span>
                                   <span>{formatIndianCurrency(item.unitPrice * (1 - (item.discountPct || 0) / 100))}</span>
                                 </div>
                               ) : (
                                 formatIndianCurrency(item.unitPrice)
                               )}
                             </td>
                             {totalTaxAmount > 0 && <td className="py-2.5 px-3 text-center">{item.gstRate}%</td>}
                             <td className="py-2.5 px-3 text-right font-semibold text-slate-900">{formatIndianCurrency(amount)}</td>
                           </tr>
                         );
                       })}
                    </tbody>
                  </table>
                </div>

                {/* Totals panel */}
                {/* Total Amount in Words (Full Width, Single Row) */}
                <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-150 rounded-lg text-[10px] mt-4">
                  <span className="font-bold text-slate-500 uppercase tracking-wider">Total Amount in Words:</span>
                  <span className="font-semibold text-slate-800 italic">{numberToIndianWords(grandTotal)}</span>
                </div>

                {/* Calculations & Instructions Side-by-Side */}
                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-7 space-y-4">
                    {docType === 'invoice' ? (
                      <div className="p-3.5 border border-emerald-200 bg-emerald-50/40 rounded-lg text-emerald-800 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          Payment Status: PAID
                        </div>
                        <p className="text-[9px] text-emerald-700 leading-relaxed font-medium">
                          Payment has been successfully received and processed. Thank you for your business!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-[10px] border border-slate-200 p-3 rounded-lg bg-slate-50/50">
                        <p className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1 font-display">
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          UPI Payment Option
                        </p>
                        <div className="flex flex-col items-center gap-2 pt-1.5 text-center">
                          {companyProfile.qrCodeImage && (
                            <div className="w-20 h-20 overflow-hidden border border-slate-200 rounded-lg p-1 bg-white flex items-center justify-center relative shadow-sm">
                              <img 
                                src={companyProfile.qrCodeImage} 
                                alt="UPI QR Code" 
                                className="w-full h-full object-contain" 
                              />
                            </div>
                          )}
                          <div className="text-[10px] text-slate-750 font-medium leading-relaxed">
                            Scan QR Code or pay to UPI:
                            <p className="font-bold text-brand-purple text-xs mt-0.5 select-all">{companyProfile.upiId || 'a2zversion@ybl'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-5 flex flex-col justify-end text-[11px] space-y-2 no-break">
                    {totalDiscountGiven > 0 ? (
                      <>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>Subtotal (Pre-Discount):</span>
                          <span className="font-medium">{formatIndianCurrency(baseSubtotal)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-655 font-bold">
                          <span>Total Discount Given:</span>
                          <span>-{formatIndianCurrency(totalDiscountGiven)}</span>
                        </div>
                        {companyProfile.applyGst ? (
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-650">
                            <span>Taxable Value:</span>
                            <span className="font-semibold text-slate-800">{formatIndianCurrency(itemsSubtotal)}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>Subtotal:</span>
                            <span className="font-semibold text-slate-800">{formatIndianCurrency(itemsSubtotal)}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                        <span>Subtotal:</span>
                        <span className="font-medium">{formatIndianCurrency(itemsSubtotal)}</span>
                      </div>
                    )}

                    {companyProfile.applyGst && totalTaxAmount > 0 ? (
                      docType === 'invoice' && invoiceDetails.gstType === 'intra' ? (
                        <>
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>CGST:</span>
                            <span className="font-medium">{formatIndianCurrency(cgstTotal)}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                            <span>SGST:</span>
                            <span className="font-medium">{formatIndianCurrency(sgstTotal)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>IGST:</span>
                          <span className="font-medium">{formatIndianCurrency(igstTotal)}</span>
                        </div>
                      )
                    ) : (
                      !companyProfile.applyGst && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>Taxes & Duties:</span>
                          <span className="font-semibold text-slate-500">Nil / Exempt</span>
                        </div>
                      )
                    )}

                    {companyProfile.applyGst && totalTaxAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                        <span>Total GST:</span>
                        <span className="font-medium">{formatIndianCurrency(totalTaxAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-2 text-slate-900 font-bold bg-slate-100 px-3 rounded-lg text-xs">
                      <span>Grand Total:</span>
                      <span>{formatIndianCurrency(grandTotal)}</span>
                    </div>

                    {docType === 'invoice' && (invoiceDetails.advanceAmountPaid || 0) > 0 && (
                      <>
                        <div className="flex justify-between py-1.5 px-3 text-slate-600 border-b border-slate-100 text-[10px] font-medium mt-1">
                          <span>Less: Advance Paid:</span>
                          <span className="text-slate-500">-{formatIndianCurrency(invoiceDetails.advanceAmountPaid || 0)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-brand-blue font-extrabold bg-blue-50/50 px-3 rounded-lg text-xs mt-1 border border-blue-100/50">
                          <span>Balance Due:</span>
                          <span>{formatIndianCurrency(Math.max(0, grandTotal - (invoiceDetails.advanceAmountPaid || 0)))}</span>
                        </div>
                      </>
                    )}

                    {docType === 'quotation' && (quotationDetails.advancePercentage || 0) > 0 && (
                      <>
                        <div className="flex justify-between py-1.5 px-3 text-slate-600 border-b border-slate-100 text-[10px] font-medium mt-1">
                          <span>Advance Payable ({quotationDetails.advancePercentage}%):</span>
                          <span className="text-slate-800 font-bold">{formatIndianCurrency(grandTotal * (quotationDetails.advancePercentage || 0) / 100)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-brand-purple font-extrabold bg-purple-50/50 px-3 rounded-lg text-xs mt-1 border border-purple-100/50">
                          <span>Balance on Completion ({100 - (quotationDetails.advancePercentage || 0)}%):</span>
                          <span>{formatIndianCurrency(grandTotal * (1 - (quotationDetails.advancePercentage || 0) / 100))}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Milestones & Proposal Notes (Full Width, Bottom) */}
                {docType === 'quotation' && (
                  <div className="mt-4 space-y-1.5 text-[10px] border border-purple-200/50 p-3 rounded-lg bg-purple-50/30">
                    <p className="font-bold text-brand-purple uppercase tracking-wider border-b border-purple-100 pb-1 font-display">
                      Payment Milestones & Proposal Notes
                    </p>
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-700 font-medium">
                      {quotationDetails.clientNote || '—'}
                    </p>
                  </div>
                )}
              </div>

                {/* Our Services Banner */}
                <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">Our Core Capabilities & Services</p>
                  <div className="flex justify-center items-center gap-4 text-[9px]">
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                      AI Tools Integration
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                      Business Automation
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Website Development
                    </span>
                  </div>
                </div>

                {/* Signatures & Declarations */}
                <div className="mt-3 border-t border-slate-200 pt-3 space-y-3 no-break">
                  <div className="grid grid-cols-12 gap-4 text-[10px] items-end">
                  <div className={`${docType === 'invoice' ? 'col-span-8' : 'col-span-12'} space-y-0.5 text-slate-500`}>
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-[8px]">Declaration / Conditions:</p>
                    <p className="leading-relaxed whitespace-pre-wrap text-[8.5px] text-slate-500">
                      {docType === 'invoice' 
                        ? companyProfile.gstDeclaration 
                        : 'This document constitutes a business proposal estimate. Actual invoices will match finalized scopes. Standard terms apply.'}
                    </p>
                  </div>

                  {docType === 'invoice' && (
                    <div className="col-span-4 text-center flex flex-col justify-end min-h-[50px]">
                      <div className="text-slate-800 mb-1">
                        <p className="font-bold text-[9px] text-slate-500 uppercase tracking-wider">For {companyProfile.companyName}</p>
                      </div>
                      <div className="h-10 flex items-center justify-center relative">
                        {companyProfile.signatureImage ? (
                          <img 
                            src={companyProfile.signatureImage} 
                            alt="CEO Signature" 
                            className="max-h-10 max-w-[100px] object-contain animate-fade-in" 
                          />
                        ) : (
                          <div className="h-10" />
                        )}
                      </div>
                      <div className="border-t border-slate-300 pt-1.5 mt-1">
                        <p className="font-semibold text-slate-700 font-display">Authorized Signatory</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
