import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Lock, 
  Folder, 
  FolderPlus, 
  FileText, 
  FileImage, 
  FileCode,
  File, 
  UploadCloud, 
  Mail, 
  Download, 
  Trash2, 
  Search, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Settings, 
  Activity, 
  Database, 
  Share2, 
  Key, 
  ChevronRight, 
  Sparkles,
  RefreshCw,
  Eye,
  Send,
  Check,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Menu
} from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import emailjs from '@emailjs/browser';

// Sample mock data for documents
const INITIAL_FILES = [
  {
    id: '1',
    name: 'Salary_Statement.pdf',
    size: '245 KB',
    sizeBytes: 250880,
    type: 'pdf',
    date: '2026-06-12 14:32',
    category: 'FINANCE',
    previewData: {
      title: 'Salary Statement',
      company: 'SmartSystems Technologies Corp.',
      period: 'May 2026',
      netPay: '$8,450.00',
      grossPay: '$11,200.00',
      taxWithheld: '$2,100.00',
      benefits: '$650.00',
      employee: 'Alex Mercer',
      role: 'Lead AI Engineer',
      hash: 'SHA-256: 8a4f91b2c4d6e8f01a3c5e7g9i0k2m4n6p8r0t2v4w6x8y0z'
    }
  },
  {
    id: '2',
    name: 'Bank_Draft.png',
    size: '1.2 MB',
    sizeBytes: 1258291,
    type: 'image',
    date: '2026-06-13 09:15',
    category: 'BANKING',
    previewData: {
      title: 'Official Bank Draft',
      bankName: 'Global Trust Bank Ltd.',
      draftNumber: 'GTB-8829103-A',
      payee: 'Alex Mercer',
      amount: '$15,000.00',
      memo: 'Consulting Services Contract Alpha',
      status: 'CLEARED & VERIFIED',
      hash: 'SHA-256: 3c5e7g9i0k2m4n6p8r0t2v4w6x8y0z1a3b5c7d9e1f3g5h7i'
    }
  },
  {
    id: '3',
    name: 'Employment_Contract.docx',
    size: '512 KB',
    sizeBytes: 524288,
    type: 'doc',
    date: '2026-06-10 11:04',
    category: 'LEGAL',
    previewData: {
      title: 'Employment Agreement',
      partyA: 'SmartSystems Technologies Corp.',
      partyB: 'Alex Mercer',
      position: 'Lead Web Architect',
      compensation: '$134,400.00 / year',
      status: 'FULLY EXECUTED',
      hash: 'SHA-256: f3g5h7i9j1k3m5o7q9s1u3w5y7z9a1b3c5d7e9f1g3h5i7j9'
    }
  }
];

export default function App() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Upload progress states
  const [uploadingFile, setUploadingFile] = useState(null);

  // Email Sharing states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareForm, setShareForm] = useState({
    email: '',
    fileId: '',
    message: ''
  });
  const [isSharingLoading, setIsSharingLoading] = useState(false);

  // Viewer state
  const [activeViewerFile, setActiveViewerFile] = useState(null);

  // Clickable Metric Card detail state
  const [activeMetricDetail, setActiveMetricDetail] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // High-tech background simulation stats
  const [cryptoRate, setCryptoRate] = useState(48.2);
  const [nodesConnected, setNodesConnected] = useState(12);
  const [lastVerifiedHash, setLastVerifiedHash] = useState('SHA-256: 9e32a4...');

  // Firebase auth state subscription
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser({
          name: firebaseUser.displayName || 'Operations Agent',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || ''
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auto-simulate stats update for tech aesthetic
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoRate(prev => +(prev + (Math.random() - 0.5) * 1.5).toFixed(1));
      if (Math.random() > 0.8) {
        setNodesConnected(prev => Math.max(8, Math.min(16, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
      if (Math.random() > 0.9) {
        setLastVerifiedHash('SHA-256: ' + Math.random().toString(36).substring(2, 8) + '...');
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Real Google Auth Sign-In via Firebase (Called directly on click)
  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      addToast('Access Granted', `Signed in as ${result.user.displayName || 'Agent'}`, 'success');
    } catch (error) {
      console.error('Google Auth Sign-In Error:', error);
      
      // Detailed error toasts based on firebase issues
      if (error.code === 'auth/invalid-api-key') {
        addToast('Config Required', 'Firebase Config API Keys are empty. Please replace in firebase.js.', 'error');
      } else {
        addToast('SSO Failed', error.message || 'Single Sign-On failed.', 'error');
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsProfileDropdownOpen(false);
      addToast('Session Ended', 'Logged out of SmartSystems Security Operations Enclave.', 'info');
    } catch (error) {
      console.error('Logout Error:', error);
      addToast('Logout Failed', 'Failed to terminate auth session.', 'error');
    }
  };

  // Handle Drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle Drag Leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // File processing common function
  const processUploadedFiles = (uploadedFiles) => {
    const list = Array.from(uploadedFiles);
    if (list.length === 0) return;

    let index = 0;
    
    const uploadNextFile = () => {
      if (index >= list.length) {
        setUploadingFile(null);
        return;
      }

      const file = list[index];
      
      // Setup mock uploader simulation
      setUploadingFile({ name: file.name, progress: 0 });
      let currentProgress = 0;
      
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setUploadingFile(prev => prev ? { ...prev, progress: 100 } : null);
          clearInterval(interval);
          
          // Determine type and category
          const ext = file.name.split('.').pop().toLowerCase();
          let type = 'file';
          let category = 'DOCUMENT';
          
          if (['pdf'].includes(ext)) {
            type = 'pdf';
            category = 'FINANCE';
          } else if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) {
            type = 'image';
            category = 'BANKING';
          } else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) {
            type = 'doc';
            category = 'LEGAL';
          }

          // Size text formatting
          const bytes = file.size;
          let sizeStr = '';
          if (bytes < 1024) sizeStr = bytes + ' B';
          else if (bytes < 1024 * 1024) sizeStr = (bytes / 1024).toFixed(0) + ' KB';
          else sizeStr = (bytes / (1024 * 1024)).toFixed(1) + ' MB';

          // Generate file
          const newDoc = {
            id: Date.now().toString() + '_' + index,
            name: file.name,
            size: sizeStr,
            sizeBytes: bytes,
            type: type,
            date: new Date().toISOString().replace('T', ' ').slice(0, 16),
            category: category.toUpperCase(),
            previewData: {
              title: file.name,
              details: `User Secure File Vault Upload. Cryptographically verified.`,
              size: sizeStr,
              hash: 'SHA-256: ' + Array.from({length: 48}, () => Math.floor(Math.random()*16).toString(16)).join(''),
              customUpload: true
            }
          };

          setFiles(prev => [newDoc, ...prev]);
          addToast('File Secured', `"${file.name}" has been AES-256 encrypted and stored.`, 'success');

          index++;
          setTimeout(uploadNextFile, 400); // Small interval between files
        } else {
          setUploadingFile(prev => prev ? { ...prev, progress: currentProgress } : null);
        }
      }, 150);
    };

    uploadNextFile();
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  // File Select Handler
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
  };

  // Trigger File Input Click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Delete Document
  const handleDeleteFile = (id, name) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    addToast('Document Deleted', `"${name}" removed from vault. Space reclaimed.`, 'info');
  };

  // Simulate Download
  const handleDownload = (name) => {
    addToast('Downloading File', `Initializing secure stream for "${name}"...`, 'info');
    setTimeout(() => {
      addToast('Download Complete', `"${name}" downloaded successfully.`, 'success');
    }, 1500);
  };

  // Open share modal
  const handleOpenShare = (fileId = '') => {
    setShareForm({
      email: '',
      fileId: fileId || (files[0]?.id || ''),
      message: ''
    });
    setIsShareModalOpen(true);
  };

  // Real Email Dispatches (Google Apps Script Web App API)
  const handleShareSubmit = (e) => {
    e.preventDefault();
    if (!shareForm.email || !shareForm.fileId) {
      addToast('Validation Error', 'Please fill in the recipient email and select a file.', 'error');
      return;
    }
    
    setIsSharingLoading(true);
    const sharedFile = files.find(f => f.id === shareForm.fileId);
    const fileTitle = sharedFile ? sharedFile.name : 'Unknown Document';
    const accessMessage = shareForm.message || 'Access credentials and encrypted key link enclosed.';

    const payload = {
      recipientEmail: shareForm.email,
      fileTitle: fileTitle,
      accessMessage: accessMessage
    };

    fetch('https://script.google.com/macros/s/AKfycbzFr0LFR-soCC1rcusFEYQ2T3hr681yyQRITaUqvL059IdKgB25mab5OyliODFLJQ/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      setIsSharingLoading(false);
      setIsShareModalOpen(false);
      addToast(
        'Email Dispatched', 
        `Secure access link sent to ${shareForm.email} for "${fileTitle}"`, 
        'success'
      );
    })
    .catch((err) => {
      console.error('Apps Script secure dispatch error:', err);
      setIsSharingLoading(false);
      addToast(
        'Dispatch Error', 
        'Failed to connect to the Apps Script security enclave portal.', 
        'error'
      );
    });
  };

  // Calculate dynamic stats
  const totalStorageBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const currentUtilizedStorage = totalStorageBytes / (1024 * 1024);
  const totalStorageFormatted = totalStorageBytes < 1024 * 1024 
    ? (totalStorageBytes / 1024).toFixed(0) + ' KB'
    : currentUtilizedStorage.toFixed(2) + ' MB';

  // Filters
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-vault-bg font-sans text-slate-100 antialiased selection:bg-vault-accent/30 selection:text-vault-accent">
      
      {/* 1. Sidebar Container */}
      <aside className="hidden lg:flex w-64 border-r border-vault-border bg-vault-dark flex-col z-10 shrink-0">
        {/* Brand/Logo Header */}
        <div className="h-16 flex items-center px-6 gap-3 border-b border-vault-border">
          <div className="h-10 w-10 rounded-lg bg-vault-accent/10 border border-vault-accent/30 flex items-center justify-center text-vault-accent shadow-[0_0_15px_rgba(34,211,238,0.15)] active-glow">
            <Shield className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight tracking-wider uppercase font-display brand-glow text-white">
              SmartSystems
            </h1>
            <span className="text-[9px] text-vault-accent font-bold tracking-widest uppercase flex items-center gap-1">
              Operations <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 px-2">Workspace Navigation</div>
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
              activeTab === 'dashboard' 
                ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Database className={`h-4.5 w-4.5 ${activeTab === 'dashboard' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
              <span>Security Dashboard</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </button>

          <button 
            onClick={() => setActiveTab('all-files')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
              activeTab === 'all-files' 
                ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Folder className={`h-4.5 w-4.5 ${activeTab === 'all-files' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
              <span>All Documents</span>
            </div>
            <span className="bg-vault-bg border border-vault-border/50 text-[10px] font-semibold text-vault-accent px-1.5 py-0.5 rounded-md">
              {files.length}
            </span>
          </button>

          <button 
            onClick={() => handleOpenShare()}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-vault-panel/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-300" />
              <span>Quick Share Link</span>
            </div>
            <Sparkles className="h-4 w-4 text-vault-accent/70" />
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
              activeTab === 'settings' 
                ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className={`h-4.5 w-4.5 ${activeTab === 'settings' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
              <span>Settings & Keys</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </button>

          {/* Directory Folder Tree Simulator */}
          <div className="pt-6">
            <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 px-2 flex justify-between items-center">
              <span>Secure Enclaves</span>
              <FolderPlus className="h-3.5 w-3.5 hover:text-vault-accent cursor-pointer" />
            </div>
            <div className="space-y-1.5 px-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                <Folder className="h-3.5 w-3.5 text-teal-400" />
                <span className="truncate">Root / Finance</span>
              </div>
              <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                <Folder className="h-3.5 w-3.5 text-yellow-400" />
                <span className="truncate">Root / Banking</span>
              </div>
              <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                <Folder className="h-3.5 w-3.5 text-indigo-400" />
                <span className="truncate">Root / Legal</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Storage Capacity Gauge */}
        <div className="p-4 border-t border-vault-border bg-vault-darker">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Enclave Space</span>
            <span className="text-white font-bold">{currentUtilizedStorage.toFixed(2)} MB / 1000 MB</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-vault-accent to-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentUtilizedStorage / 1000) * 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
            <Lock className="h-3 w-3 text-vault-accent" />
            <span className="truncate">AES-256 Multi-Node Encryption Active</span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Visible on < lg screen widths when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <aside className="relative flex w-64 max-w-xs flex-1 flex-col bg-vault-dark border-r border-vault-border h-full animate-slide-in">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg border border-vault-border bg-vault-darker hover:bg-vault-panel text-slate-400 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-16 flex items-center px-6 gap-3 border-b border-vault-border">
              <div className="h-10 w-10 rounded-lg bg-vault-accent/10 border border-vault-accent/30 flex items-center justify-center text-vault-accent shadow-[0_0_15px_rgba(34,211,238,0.15)] active-glow">
                <Shield className="h-6 w-6 stroke-[1.8]" />
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight tracking-wider uppercase font-display brand-glow text-white">
                  SmartSystems
                </h1>
                <span className="text-[9px] text-vault-accent font-bold tracking-widest uppercase flex items-center gap-1">
                  Operations <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                </span>
              </div>
            </div>

            <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
              <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 px-2">Workspace Navigation</div>
              
              <button 
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  activeTab === 'dashboard' 
                    ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                    : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Database className={`h-4.5 w-4.5 ${activeTab === 'dashboard' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  <span>Security Dashboard</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>

              <button 
                onClick={() => {
                  setActiveTab('all-files');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  activeTab === 'all-files' 
                    ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                    : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className={`h-4.5 w-4.5 ${activeTab === 'all-files' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  <span>All Documents</span>
                </div>
                <span className="bg-vault-bg border border-vault-border/50 text-[10px] font-semibold text-vault-accent px-1.5 py-0.5 rounded-md">
                  {files.length}
                </span>
              </button>

              <button 
                onClick={() => {
                  handleOpenShare();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-vault-panel/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4.5 w-4.5 text-slate-400 group-hover:text-slate-300" />
                  <span>Quick Share Link</span>
                </div>
                <Sparkles className="h-4 w-4 text-vault-accent/70" />
              </button>

              <button 
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  activeTab === 'settings' 
                    ? 'bg-vault-panel text-white font-medium border-l-2 border-vault-accent' 
                    : 'text-slate-400 hover:text-white hover:bg-vault-panel/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className={`h-4.5 w-4.5 ${activeTab === 'settings' ? 'text-vault-accent' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  <span>Settings & Keys</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>

              <div className="pt-6">
                <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2 px-2 flex justify-between items-center">
                  <span>Secure Enclaves</span>
                  <FolderPlus className="h-3.5 w-3.5 hover:text-vault-accent cursor-pointer" />
                </div>
                <div className="space-y-1.5 px-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                    <Folder className="h-3.5 w-3.5 text-teal-400" />
                    <span className="truncate">Root / Finance</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                    <Folder className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="truncate">Root / Banking</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-1.5 hover:bg-vault-panel/30 rounded cursor-pointer transition">
                    <Folder className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="truncate">Root / Legal</span>
                  </div>
                </div>
              </div>
            </nav>

            <div className="p-4 border-t border-vault-border bg-vault-darker">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Enclave Space</span>
                <span className="text-white font-bold">{currentUtilizedStorage.toFixed(2)} MB / 1000 MB</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-vault-accent to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (currentUtilizedStorage / 1000) * 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
                <Lock className="h-3 w-3 text-vault-accent" />
                <span className="truncate">AES-256 Multi-Node Encryption Active</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 2. Main content container */}
      <main className="flex-1 flex flex-col min-w-0 bg-vault-bg relative overflow-y-auto">
        
        {/* Main Content Header */}
        <header className="h-16 border-b border-vault-border bg-vault-panel/40 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 lg:px-8 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-2.5 text-sm text-slate-400 font-medium">
            {/* Hamburger Button for mobile/tablet */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-vault-border bg-vault-panel/50 hover:bg-vault-panel text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* SmartSystems brand logo/title visible only on mobile/tablet (hidden on lg where sidebar is shown) */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden select-none">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-vault-accent/10 border border-vault-accent/30 flex items-center justify-center text-vault-accent shadow-[0_0_10px_rgba(34,211,238,0.15)] active-glow">
                <Shield className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.8]" />
              </div>
              <div>
                <h1 className="font-bold text-xs leading-none tracking-wider uppercase font-display brand-glow text-white">
                  SmartSystems
                </h1>
                <span className="text-[7px] text-vault-accent font-bold tracking-widest uppercase flex items-center gap-0.5 mt-0.5">
                  Ops <span className="inline-block h-1 w-1 rounded-full bg-emerald-400 animate-ping"></span>
                </span>
              </div>
            </div>

            {/* Breadcrumb Navigation - Hidden on Mobile/Tablet, visible only on lg screens */}
            <div className="hidden lg:flex items-center gap-2.5">
              <span>Enclaves</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-vault-accent font-semibold flex items-center gap-1.5">
                Personal Vault
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"></span>
              </span>
            </div>
          </div>

          {/* Quick Search, Sharing and Auth Cluster */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative w-48 lg:w-64 max-md:hidden">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="h-4 w-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search enclave..." 
                className="w-full pl-9 pr-4 py-1.5 bg-vault-dark border border-vault-border rounded-lg text-xs placeholder-slate-500 text-slate-100 focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent transition duration-150"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button 
              onClick={() => handleOpenShare()}
              className="bg-vault-panel border border-vault-border hover:border-vault-accent/50 hover:bg-vault-dark text-slate-300 hover:text-white text-xs font-semibold px-2 py-1.5 sm:px-3 rounded-lg transition flex items-center gap-1.5 sm:gap-2 hover-glow shrink-0"
            >
              <Share2 className="h-3.5 w-3.5 text-vault-accent" />
              <span className="hidden sm:inline">Quick Share</span>
              <span className="sm:hidden">Share</span>
            </button>

            {/* Rebranded Auth Cluster */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-vault-border relative">
              {isLoggedIn ? (
                /* Logged In State */
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 py-1 px-2.5 rounded-lg bg-vault-panel/50 border border-vault-border/65 hover:border-vault-accent/50 hover:bg-vault-panel transition group focus:outline-none"
                  >
                    <div className="relative">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-7 w-7 rounded-full object-cover border border-vault-accent/40 group-hover:border-vault-accent transition duration-150 active-glow" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-vault-accent/15 border border-vault-accent/30 flex items-center justify-center text-xs font-bold text-vault-accent">
                          <User className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-vault-panel"></span>
                    </div>
                    <div className="text-left text-xs max-md:hidden select-none">
                      <div className="font-semibold text-white group-hover:text-vault-accent transition duration-150 truncate max-w-[80px]">{user?.name}</div>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition duration-150 shrink-0" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-20 cursor-default" onClick={() => setIsProfileDropdownOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-48 bg-vault-panel border border-vault-border rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] py-1.5 z-30 animate-scale-up font-sans border-glow">
                        <div className="px-4 py-2 border-b border-vault-border/50 bg-vault-darker/30">
                          <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                          <div className="text-[9px] text-slate-500 font-mono truncate">{user?.email}</div>
                        </div>
                        <button 
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            addToast('Profile Settings', 'Enclave profile dashboard settings are locked in mock-action state.', 'info');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-vault-dark/50 transition flex items-center gap-2"
                        >
                          <User className="h-3.5 w-3.5 text-vault-accent" />
                          Profile Settings
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            addToast('Account Info', `Operations verified on peer network node.`, 'info');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-vault-dark/50 transition flex items-center gap-2"
                        >
                          <Shield className="h-3.5 w-3.5 text-vault-accent" />
                          Account Info
                        </button>
                        <div className="h-px bg-vault-border/50 my-1.5"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          Logout Session
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Logged Out State - Directly trigger Google Sign-In on click */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button 
                    onClick={handleGoogleLogin}
                    disabled={isAuthLoading}
                    className="text-slate-300 hover:text-white text-[11px] sm:text-xs font-semibold px-2 py-1.5 sm:px-3 rounded-lg border border-vault-border/60 hover:border-vault-accent transition hover-glow flex items-center gap-1 sm:gap-1.5"
                  >
                    {isAuthLoading ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-vault-accent" />
                    ) : (
                      <LogIn className="h-3.5 w-3.5 text-vault-accent" />
                    )}
                    Login
                  </button>
                  <button 
                    onClick={handleGoogleLogin}
                    disabled={isAuthLoading}
                    className="bg-vault-accent hover:bg-vault-accent/90 text-vault-dark text-[11px] sm:text-xs font-extrabold px-2 py-1.5 sm:px-3 rounded-lg transition hover-glow shadow-[0_0_12px_rgba(34,211,238,0.25)] animate-none shrink-0"
                  >
                    {isAuthLoading ? 'Authenticating...' : 'Sign Up'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' || activeTab === 'all-files' ? (
          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full flex-1">
            
            {/* Quick Metrics Grid (Clickable to trigger details popup overlays) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Secured Enclave Files */}
              <div 
                onClick={() => setActiveMetricDetail({
                  title: "Secured Enclave Files",
                  description: "This metric tracks the total number of individual document units currently anchored within your secure decentralized storage vault. Each file is individually encrypted before anchoring."
                })}
                className="bg-vault-panel/40 border border-vault-border/60 p-5 rounded-xl flex items-center gap-4 hover:border-vault-accent/30 hover-glow transition-all duration-300 cursor-pointer select-none"
              >
                <div className="h-12 w-12 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Secured Enclave Files</div>
                  <div className="text-2xl font-bold text-white mt-0.5">{files.length}</div>
                </div>
              </div>

              {/* Card 2: Storage Utilized */}
              <div 
                onClick={() => setActiveMetricDetail({
                  title: "Storage Utilized",
                  description: "This indicates the total cryptographic payload volume, including file data and redundant parity information, relative to your standard 1000MB allocation."
                })}
                className="bg-vault-panel/40 border border-vault-border/60 p-5 rounded-xl flex items-center gap-4 hover:border-vault-accent/30 hover-glow transition-all duration-300 cursor-pointer select-none"
              >
                <div className="h-12 w-12 rounded-lg bg-vault-accent/10 border border-vault-accent/30 flex items-center justify-center text-vault-accent shadow-[0_0_10px_rgba(34,211,238,0.05)]">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Storage Utilized</div>
                  <div className="text-2xl font-bold text-white mt-0.5">{totalStorageFormatted}</div>
                </div>
              </div>

              {/* Card 3: Systems Operations Rate */}
              <div 
                onClick={() => setActiveMetricDetail({
                  title: "Systems Operations Rate",
                  description: "Represents the real-time processing throughout and zero-knowledge proof validation speed of the system operations."
                })}
                className="bg-vault-panel/40 border border-vault-border/60 p-5 rounded-xl flex items-center gap-4 hover:border-vault-accent/30 hover-glow transition-all duration-300 cursor-pointer select-none"
              >
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Activity className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Systems Operations Rate</div>
                  <div className="text-2xl font-bold text-white mt-0.5">{cryptoRate} GH/s</div>
                </div>
              </div>

              {/* Card 4: Enclave Sync State */}
              <div 
                onClick={() => setActiveMetricDetail({
                  title: "Enclave Sync State",
                  description: "Indicates the integrity validation status, ensuring that all distributed ledgers and peer nodes are matching local state with cryptographic consensus."
                })}
                className="bg-vault-panel/40 border border-vault-border/60 p-5 rounded-xl flex items-center gap-4 hover:border-vault-accent/30 hover-glow transition-all duration-300 cursor-pointer select-none"
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Enclave Sync State</div>
                  <div className="text-2xl font-bold text-white mt-0.5">100% SECURE</div>
                </div>
              </div>

            </section>

            {/* Core Workspaces split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Document List Table Section (Col Span 2) */}
              <section className="lg:col-span-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-vault-panel/20 p-4 border border-vault-border/40 rounded-xl">
                  
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-1.5">
                    {['ALL', 'FINANCE', 'BANKING', 'LEGAL'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                          selectedCategory === cat 
                            ? 'bg-vault-accent border-vault-accent text-vault-dark shadow-[0_0_12px_rgba(34,211,238,0.3)] font-extrabold' 
                            : 'border-vault-border/50 text-slate-400 hover:text-white hover:border-vault-border'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Quick file search */}
                  <div className="relative sm:w-60 w-full sm:hidden">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Search className="h-4 w-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Filter documents..." 
                      className="w-full pl-9 pr-4 py-1.5 bg-vault-dark border border-vault-border rounded-lg text-xs text-slate-100 focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent transition duration-150"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Files Table UI Panel */}
                <div className="bg-vault-panel/30 border border-vault-border rounded-xl overflow-hidden backdrop-blur-md">
                  <div className="px-6 py-4 border-b border-vault-border/60 flex items-center justify-between">
                    <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                      <Folder className="h-4 w-4 text-vault-accent" />
                      SmartSystems Enclave Storage
                    </h2>
                    <span className="text-xs text-slate-400">
                      Showing {filteredFiles.length} of {files.length} items
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    {filteredFiles.length === 0 ? (
                      <div className="p-12 text-center flex flex-col items-center">
                        <div className="h-16 w-16 rounded-full bg-vault-panel flex items-center justify-center text-slate-400 mb-4 border border-vault-border/40">
                          <Search className="h-8 w-8 text-slate-500" />
                        </div>
                        <p className="font-medium text-sm text-slate-300">No documents match the filter</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">Try tweaking your search term or upload a new document to this category.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-vault-border/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-vault-darker/30">
                            <th className="px-6 py-3.5">Name</th>
                            <th className="px-6 py-3.5">Size</th>
                            <th className="px-6 py-3.5">Category</th>
                            <th className="px-6 py-3.5">Secured Date</th>
                            <th className="px-6 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-vault-border/40">
                          {filteredFiles.map((file) => {
                            // Map icon
                            let Icon = File;
                            let colorClass = 'text-slate-400 bg-slate-500/10 border-slate-500/20';
                            if (file.type === 'pdf') {
                              Icon = FileText;
                              colorClass = 'text-red-400 bg-red-500/10 border-red-500/20';
                            } else if (file.type === 'image') {
                              Icon = FileImage;
                              colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                            } else if (file.type === 'doc') {
                              Icon = FileCode;
                              colorClass = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
                            }

                            return (
                              <tr 
                                key={file.id} 
                                className="hover:bg-vault-panel/20 transition-colors duration-150 group"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`h-9 w-9 rounded-lg border flex items-center justify-center ${colorClass}`}>
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-semibold text-white truncate max-w-[160px] sm:max-w-[220px]" title={file.name}>
                                        {file.name}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                                        <Lock className="h-2.5 w-2.5 text-vault-accent" />
                                        AES-256
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono text-slate-300">
                                  {file.size}
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-block text-[10px] font-bold bg-vault-dark border border-vault-border text-slate-400 px-2 py-0.5 rounded uppercase">
                                    {file.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                                  {file.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition duration-150">
                                    
                                    {/* Action - View */}
                                    <button 
                                      onClick={() => setActiveViewerFile(file)}
                                      className="p-1.5 rounded-lg bg-vault-dark border border-vault-border/60 hover:bg-vault-accent/15 hover:border-vault-accent/40 text-slate-400 hover:text-vault-accent transition duration-150"
                                      title="View Document"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>

                                    {/* Action - Share */}
                                    <button 
                                      onClick={() => handleOpenShare(file.id)}
                                      className="p-1.5 rounded-lg bg-vault-dark border border-vault-border/60 hover:bg-vault-accent/15 hover:border-vault-accent/40 text-slate-400 hover:text-vault-accent transition duration-150"
                                      title="Email Share Link"
                                    >
                                      <Mail className="h-3.5 w-3.5" />
                                    </button>

                                    {/* Action - Download */}
                                    <button 
                                      onClick={() => handleDownload(file.name)}
                                      className="p-1.5 rounded-lg bg-vault-dark border border-vault-border/60 hover:bg-vault-accent/15 hover:border-vault-accent/40 text-slate-400 hover:text-vault-accent transition duration-150"
                                      title="Download Encrypted File"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                    </button>

                                    {/* Action - Delete */}
                                    <button 
                                      onClick={() => handleDeleteFile(file.id, file.name)}
                                      className="p-1.5 rounded-lg bg-vault-dark border border-vault-border/60 hover:bg-rose-500/15 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition duration-150"
                                      title="Delete File"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>

                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </section>

              {/* Right Panel: Upload Box & Enclave Status (Col Span 1) */}
              <section className="space-y-6">
                
                {/* File Uploader Core Component */}
                <div className="bg-vault-panel/30 border border-vault-border rounded-xl p-6 backdrop-blur-md">
                  <h3 className="font-semibold text-sm text-white mb-4 flex items-center gap-2">
                    <UploadCloud className="h-4.5 w-4.5 text-vault-accent" />
                    Load Crypt Enclave
                  </h3>

                  {/* Drag and drop zone */}
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                      isDragging 
                        ? 'border-vault-accent bg-vault-accent/5 scale-[0.99] border-glow' 
                        : 'border-vault-border/80 hover:border-vault-accent/60 hover:bg-vault-panel/10'
                    }`}
                    onClick={triggerFileInput}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      className="hidden" 
                      multiple 
                      accept=".pdf,.png,.jpg,.jpeg,.gif,.svg,.doc,.docx,.txt,.rtf"
                    />

                    <div className="h-14 w-14 rounded-full bg-vault-dark/80 border border-vault-border/70 flex items-center justify-center text-vault-accent mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:scale-105 transition-transform duration-200">
                      {uploadingFile ? (
                        <RefreshCw className="h-6 w-6 stroke-[1.8] animate-spin text-vault-accent" />
                      ) : (
                        <UploadCloud className="h-6 w-6 stroke-[1.8]" />
                      )}
                    </div>

                    <p className="font-semibold text-xs text-white">
                      Drag & Drop Files Here
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] leading-relaxed">
                      Accepts PDFs, Images, and Documents. Encrypted on ingest.
                    </p>

                    <button 
                      type="button"
                      className="mt-4 px-3 py-1.5 bg-vault-panel border border-vault-border hover:border-vault-accent/60 hover:text-white rounded-lg text-xs font-semibold text-slate-300 transition"
                    >
                      Browse Storage
                    </button>
                  </div>

                  {/* Realtime progress bar UI */}
                  {uploadingFile && (
                    <div className="mt-5 bg-vault-darker/60 border border-vault-border/50 rounded-lg p-3.5 space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white font-medium truncate max-w-[140px] font-mono" title={uploadingFile.name}>
                          {uploadingFile.name}
                        </span>
                        <span className="text-vault-accent font-bold font-mono">
                          {uploadingFile.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-vault-accent h-1 rounded-full transition-all duration-150"
                          style={{ width: `${uploadingFile.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-vault-accent animate-ping"></span>
                        Simulating secure ingest & hash calculation...
                      </div>
                    </div>
                  )}
                </div>

                {/* Enclave Status Widget */}
                <div className="bg-vault-panel/30 border border-vault-border rounded-xl p-5 backdrop-blur-md space-y-4">
                  <h3 className="font-semibold text-sm text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4.5 w-4.5 text-vault-accent" />
                      Enclave Status
                    </div>
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                      ONLINE
                    </span>
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-vault-border/30">
                      <span className="text-slate-400">Node Cluster</span>
                      <span className="font-mono text-white">US-EAST-4 (SECURE)</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-vault-border/30">
                      <span className="text-slate-400">Active Peer Nodes</span>
                      <span className="font-mono text-white flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-vault-accent inline-block"></span>
                        {nodesConnected} Nodes
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-vault-border/30">
                      <span className="text-slate-400">Verified Block Log</span>
                      <span className="font-mono text-slate-300 font-bold">{lastVerifiedHash}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Key Rotation Cycle</span>
                      <span className="font-mono text-slate-300">12:44:02 remaining</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="bg-vault-darker/40 rounded-lg p-2.5 border border-vault-border/30">
                      <div className="text-[10px] text-vault-accent font-semibold tracking-wider uppercase mb-1 flex items-center gap-1">
                        <Key className="h-3 w-3" /> System Logs
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 space-y-1">
                        <div className="truncate">[11:12:23] ENCRYPT: Ingest payload file stream</div>
                        <div className="truncate">[11:12:23] SHA-256: Generated node root hash</div>
                        <div className="truncate text-vault-accent/80">[11:12:24] SYNC: Multi-node cluster consensus: OK</div>
                      </div>
                    </div>
                  </div>
                </div>

              </section>

            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="p-8 max-w-4xl mx-auto w-full flex-1 space-y-8">
            <div className="bg-vault-panel/30 border border-vault-border rounded-xl p-6 backdrop-blur-md space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-vault-border/60 pb-3">
                <Settings className="h-5 w-5 text-vault-accent" />
                SmartSystems Keys & Configurations
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-vault-dark border border-vault-border rounded-lg space-y-2">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Key className="h-4 w-4 text-vault-accent" />
                    AES-256 Decryption Key
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your document vault is encrypted using a locally stored master private key. Keep this key safe.
                  </p>
                  <div className="flex gap-2 items-center pt-2">
                    <input 
                      type="password" 
                      value="••••••••••••••••••••••••••••••••••••••••••••••••" 
                      disabled
                      className="bg-vault-darker border border-vault-border/60 rounded px-3 py-1.5 text-xs text-slate-400 font-mono flex-1 focus:outline-none"
                    />
                    <button 
                      onClick={() => addToast('Key Copied', 'Encrypted key signature copied to clipboard.', 'success')}
                      className="px-3 py-1.5 bg-vault-panel border border-vault-border hover:border-vault-accent/40 hover:text-white rounded text-xs transition font-semibold"
                    >
                      Copy Signed Signature
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-vault-dark border border-vault-border rounded-lg space-y-2">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Database className="h-4 w-4 text-vault-accent" />
                    Vault Backups
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Set up automatic encrypted backups to secure cloud nodes or local storage paths.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => addToast('Backup Initialized', 'Creating encrypted backup snapshot...', 'info')}
                      className="px-4 py-2 bg-vault-accent text-vault-dark font-semibold text-xs rounded-lg hover:bg-vault-accent/90 transition shadow-[0_0_12px_rgba(34,211,238,0.2)] font-bold"
                    >
                      Create System Backup
                    </button>
                    <button 
                      onClick={() => addToast('Consensus Status', 'All 12 clusters report healthy status.', 'success')}
                      className="px-4 py-2 bg-vault-panel border border-vault-border text-slate-300 font-semibold text-xs rounded-lg hover:text-white transition"
                    >
                      Check Cluster Sync
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* 3. Toast Notifications Overlay */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
          {toasts.map((toast) => {
            let Icon = CheckCircle2;
            let themeClass = 'bg-vault-dark border-emerald-500/30 text-emerald-400';
            if (toast.type === 'error') {
              Icon = AlertTriangle;
              themeClass = 'bg-vault-dark border-rose-500/30 text-rose-400';
            } else if (toast.type === 'info') {
              Icon = Info;
              themeClass = 'bg-vault-dark border-vault-accent/30 text-vault-accent';
            }

            return (
              <div 
                key={toast.id} 
                className={`flex items-start gap-3 p-4 rounded-xl border shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-fade-in ${themeClass}`}
              >
                <div className="shrink-0 mt-0.5">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {toast.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                    {toast.message}
                  </p>
                </div>
                <button 
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-slate-500 hover:text-white transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 4. Email Document Sharing Modal */}
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop overlay */}
            <div 
              className="absolute inset-0 bg-vault-bg/80 backdrop-blur-sm transition-opacity"
              onClick={() => setIsShareModalOpen(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-vault-panel border border-vault-border rounded-xl w-[92%] sm:w-full max-w-md p-6 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all animate-scale-up">
              <div className="flex items-center justify-between border-b border-vault-border/60 pb-3 mb-5">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Mail className="h-4.5 w-4.5 text-vault-accent" />
                  Secure Crypt Sharing
                </h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleShareSubmit} className="space-y-4">
                
                {/* Field: Recipient Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Recipient Email
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="partner@organization.com"
                    className="w-full px-3.5 py-2 bg-vault-dark border border-vault-border rounded-lg text-xs placeholder-slate-600 text-slate-100 focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent transition"
                    value={shareForm.email}
                    onChange={(e) => setShareForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                {/* Field: Select File */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Vault Document
                  </label>
                  <select 
                    required
                    className="w-full px-3 py-2 bg-vault-dark border border-vault-border rounded-lg text-xs text-slate-200 focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent transition cursor-pointer"
                    value={shareForm.fileId}
                    onChange={(e) => setShareForm(prev => ({ ...prev, fileId: e.target.value }))}
                  >
                    <option value="" disabled>Choose a file from vault...</option>
                    {files.map(f => (
                      <option key={f.id} value={f.id} className="bg-vault-panel text-white">
                        {f.name} ({f.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field: Message */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Access Message (Encrypted)
                  </label>
                  <textarea 
                    rows="3"
                    placeholder="Enter additional sharing message or access constraints..."
                    className="w-full px-3.5 py-2 bg-vault-dark border border-vault-border rounded-lg text-xs placeholder-slate-600 text-slate-100 focus:outline-none focus:border-vault-accent focus:ring-1 focus:ring-vault-accent transition resize-none"
                    value={shareForm.message}
                    onChange={(e) => setShareForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <div className="bg-vault-darker/60 border border-vault-border/50 rounded-lg p-3 text-[10px] text-slate-400 flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-vault-accent shrink-0 mt-0.5" />
                  <p className="leading-normal">
                    This file share generates an encrypted public key signature valid for 7 days. The recipient must confirm identity verification to unlock the stream payload.
                  </p>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 justify-end pt-2 border-t border-vault-border/40 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsShareModalOpen(false)}
                    className="px-4 py-2 bg-vault-dark border border-vault-border text-slate-300 font-semibold text-xs rounded-lg hover:text-white transition"
                    disabled={isSharingLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-vault-accent text-vault-dark font-semibold text-xs rounded-lg hover:bg-vault-accent/90 transition shadow-[0_0_12px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 min-w-[100px]"
                    disabled={isSharingLoading}
                  >
                    {isSharingLoading ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Encrypting...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send Email
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* 5. Document Detail Viewer Modal */}
        {activeViewerFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-vault-bg/80 backdrop-blur-sm transition-opacity"
              onClick={() => setActiveViewerFile(null)}
            ></div>
            
            <div className="bg-vault-panel border border-vault-border rounded-xl w-[92%] sm:w-full max-w-2xl p-6 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all flex flex-col h-[520px] max-h-[85vh] animate-scale-up">
              
              {/* Viewer Header */}
              <div className="flex items-center justify-between border-b border-vault-border/60 pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded bg-vault-accent/15 border border-vault-accent/30 flex items-center justify-center text-vault-accent">
                    {activeViewerFile.type === 'pdf' ? <FileText className="h-4 w-4" /> : 
                     activeViewerFile.type === 'image' ? <FileImage className="h-4 w-4" /> : <FileCode className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{activeViewerFile.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{activeViewerFile.previewData?.hash || 'SHA-256 ID Unregistered'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownload(activeViewerFile.name)}
                    className="p-1.5 rounded bg-vault-dark border border-vault-border hover:border-vault-accent/40 text-slate-400 hover:text-white transition"
                    title="Download"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => setActiveViewerFile(null)}
                    className="p-1.5 rounded bg-vault-dark border border-vault-border hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Viewer Mock Contents render */}
              <div className="flex-1 overflow-y-auto bg-vault-dark border border-vault-border/80 rounded-lg p-5 font-sans relative">
                
                {/* Watermark background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                  <Shield className="h-96 w-96 text-white" />
                </div>

                {activeViewerFile.id === '1' && (
                  /* Mock Salary Statement PDF rendering */
                  <div className="space-y-6 text-slate-200">
                    <div className="flex justify-between border-b border-vault-border/40 pb-3">
                      <div>
                        <h4 className="font-extrabold text-base tracking-tight text-white font-display uppercase">{activeViewerFile.previewData.company}</h4>
                        <p className="text-[10px] text-slate-400">100 Silicon Boulevard, San Jose, CA</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">Official Payslip</span>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">Period: {activeViewerFile.previewData.period}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs bg-vault-panel/20 p-3 rounded-lg border border-vault-border/40">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Employee Name</span>
                        <p className="font-semibold text-white mt-0.5">{activeViewerFile.previewData.employee}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide">Role / Position</span>
                        <p className="font-semibold text-white mt-0.5">{activeViewerFile.previewData.role}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-bold text-xs text-white uppercase tracking-wider">Payroll Breakdown</h5>
                      <div className="border border-vault-border/60 rounded-lg overflow-hidden text-xs">
                        <div className="grid grid-cols-2 bg-vault-darker/50 font-bold text-slate-400 px-3 py-1.5 border-b border-vault-border/40">
                          <div>Description</div>
                          <div className="text-right">Amount</div>
                        </div>
                        <div className="divide-y divide-vault-border/40 font-mono px-3">
                          <div className="grid grid-cols-2 py-2">
                            <div className="text-slate-300">Base Earnings</div>
                            <div className="text-right text-white font-semibold">{activeViewerFile.previewData.grossPay}</div>
                          </div>
                          <div className="grid grid-cols-2 py-2">
                            <div className="text-slate-300">Benefit Allowances</div>
                            <div className="text-right text-emerald-400">+{activeViewerFile.previewData.benefits}</div>
                          </div>
                          <div className="grid grid-cols-2 py-2">
                            <div className="text-slate-300">Federal Tax Withholding</div>
                            <div className="text-right text-rose-400">-{activeViewerFile.previewData.taxWithheld}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 bg-vault-accent/10 border-t border-vault-accent/20 px-3 py-2.5 font-bold">
                          <div className="text-vault-accent text-xs">NET AMOUNT RECEIVED</div>
                          <div className="text-right text-vault-accent text-sm font-mono">{activeViewerFile.previewData.netPay}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-vault-border/30 flex justify-between items-center text-[10px] text-slate-400">
                      <div>Electronic Payee Code: <span className="font-mono text-white">488921-GTX</span></div>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Direct Deposit Confirmed
                      </div>
                    </div>
                  </div>
                )}

                {activeViewerFile.id === '2' && (
                  /* Mock Bank Draft PNG rendering */
                  <div className="h-full flex flex-col justify-center py-4 space-y-6">
                    
                    {/* Bank Draft SVG Layout container */}
                    <div className="relative bg-teal-950/20 border border-teal-500/40 rounded-xl p-5 shadow-inner flex flex-col justify-between h-[230px] font-serif text-teal-100">
                      
                      {/* Security Guilloche simulation */}
                      <div className="absolute inset-0 opacity-[0.03] border-4 border-teal-500 rounded-xl pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500 via-teal-900 to-black"></div>

                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-teal-300 font-sans">{activeViewerFile.previewData.bankName}</h4>
                          <p className="text-[8px] font-sans text-teal-400/70">Main Vault Transit Code: 0910-88229</p>
                        </div>
                        <div className="text-right font-sans">
                          <p className="text-[9px] text-teal-400 font-bold">DRAFT REF: {activeViewerFile.previewData.draftNumber}</p>
                          <p className="text-[8px] text-teal-400/70 mt-0.5">DATE: 2026-06-13</p>
                        </div>
                      </div>

                      <div className="my-3 space-y-2 font-sans">
                        <div className="flex justify-between items-end border-b border-teal-500/30 pb-1">
                          <span className="text-[8px] text-teal-400 uppercase tracking-widest">Pay To The Order Of:</span>
                          <span className="text-xs font-bold text-white underline decoration-dotted">{activeViewerFile.previewData.payee}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-teal-500/30 pb-1">
                          <span className="text-[8px] text-teal-400 uppercase tracking-widest">Amount:</span>
                          <span className="text-xs font-bold text-teal-300 font-mono">{activeViewerFile.previewData.amount}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end text-[8px] font-sans mt-2">
                        <div>
                          <span className="text-teal-400">MEMO: </span>
                          <span className="text-white underline decoration-dotted">{activeViewerFile.previewData.memo}</span>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="border border-teal-500/40 px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-bold text-[8px] tracking-wider animate-pulse flex items-center gap-1 font-sans">
                            <Check className="h-3 w-3" /> SECURITY CLEARED
                          </div>
                          <span className="text-[7px] text-teal-400/60 font-mono">AUTHORIZED SIGNATURE: SECURE_SIGNATURE_OK</span>
                        </div>
                      </div>

                    </div>

                    <div className="bg-vault-panel/30 border border-vault-border/50 rounded-lg p-3 text-[10px] text-slate-400 space-y-1">
                      <div className="font-bold text-white uppercase flex items-center gap-1.5 text-teal-400">
                        <Lock className="h-3.5 w-3.5" /> High-Tech Check Verification Stamp
                      </div>
                      <p className="leading-normal">
                        This document draft cleared standard clearinghouse ledger checks on 2026-06-13 09:15:32 UT. Cryptographic seal matches network signature <span className="font-mono text-white">ConsensusBlock-9910.</span>
                      </p>
                    </div>

                  </div>
                )}

                {activeViewerFile.id === '3' && (
                  /* Mock Contract DOCX rendering */
                  <div className="space-y-5 text-slate-300 text-xs">
                    <div className="text-center space-y-1 py-3 border-b border-vault-border/30">
                      <h4 className="font-bold text-sm text-white font-display uppercase tracking-wide">{activeViewerFile.previewData.title}</h4>
                      <p className="text-[9px] text-slate-400">Confidential Employment Document. Property of Company.</p>
                    </div>

                    <div className="space-y-4 leading-relaxed font-serif text-slate-200">
                      <p>
                        This Agreement is made on this 10th day of June, 2026, between <strong>{activeViewerFile.previewData.partyA}</strong> (the "Company") and <strong>{activeViewerFile.previewData.partyB}</strong> (the "Employee").
                      </p>
                      
                      <div className="space-y-2">
                        <h5 className="font-bold text-xs text-white uppercase font-sans tracking-wide">1. Duties & Responsibilities</h5>
                        <p className="pl-3">
                          The Employee shall serve in the capacity of <strong>{activeViewerFile.previewData.position}</strong>. The Employee agrees to perform all obligations of the position diligently, securely, and in full alignment with the company's technical architecture.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-bold text-xs text-white uppercase font-sans tracking-wide">2. Compensation & Benefits</h5>
                        <p className="pl-3">
                          In consideration of the service, the Employee shall receive compensation of <strong>{activeViewerFile.previewData.compensation}</strong>. All taxes, federal withholdings, and benefits will be processed through the secure payroll ledger node.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-bold text-xs text-white uppercase font-sans tracking-wide">3. Execution Signature Seal</h5>
                        <div className="border border-vault-border/50 rounded-lg p-3 bg-vault-panel/10 flex justify-between items-center font-sans text-[10px]">
                          <div>
                            <span className="text-slate-400 block font-bold uppercase">COMPANY CEO SIGNATURE</span>
                            <span className="text-emerald-400 font-mono font-semibold">SIGNED: [AG_CORP_CEO_APPROVED]</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block font-bold uppercase">EMPLOYEE SIGNATURE</span>
                            <span className="text-emerald-400 font-mono font-semibold">SIGNED: [ALEX_MERCER_APPROVED]</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 text-center text-[10px] text-slate-500 font-sans uppercase tracking-widest font-bold">
                      Status: {activeViewerFile.previewData.status}
                    </div>
                  </div>
                )}

                {/* Render fallback for user-uploaded custom files */}
                {activeViewerFile.previewData?.customUpload && (
                  <div className="space-y-6 text-slate-300">
                    <div className="flex flex-col items-center justify-center py-6 text-center border-b border-vault-border/30">
                      <div className="h-16 w-16 rounded-2xl bg-vault-accent/10 border border-vault-accent/30 flex items-center justify-center text-vault-accent mb-4 animate-pulse">
                        <Lock className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold text-white text-base">Ingested Secure Enclave File</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Status: SECURE & INTEGRITY SCAN PASSED</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-vault-panel/20 p-3 rounded-lg border border-vault-border/40">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">File Extension Type</span>
                        <span className="font-bold text-white font-mono uppercase">{activeViewerFile.category}</span>
                      </div>
                      <div className="bg-vault-panel/20 p-3 rounded-lg border border-vault-border/40">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Byte Footprint Size</span>
                        <span className="font-bold text-white font-mono">{activeViewerFile.size}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-bold text-xs text-white uppercase tracking-wider">Hexadecimal Entropy Stream</h5>
                      <div className="bg-vault-darker rounded-lg p-3 font-mono text-[9px] text-slate-400 border border-vault-border/60 leading-relaxed overflow-x-auto select-none">
                        <div>0000: 4a6f 6e61 7468 616e 2053 616e 6465 7273</div>
                        <div>0010: 204c 6561 6420 536f 6674 7761 7265 2044</div>
                        <div>0020: 6576 656c 6f70 6572 2050 6179 726f 6c6c</div>
                        <div>0030: 2e20 4145 532d 3235 3620 456e 6372 7970</div>
                        <div>0040: 7465 6420 5374 7265 616d 2050 6179 6c6f</div>
                        <div>0050: 6164 204f 4b2e 2049 6e74 6567 7269 7479</div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 leading-relaxed flex gap-2 items-start bg-vault-panel/20 border border-vault-border/40 rounded-lg p-3">
                      <Sparkles className="h-4.5 w-4.5 text-vault-accent shrink-0" />
                      <p>
                        This payload file was processed through local client-side hashing filters prior to uploading. Decryption keys remain locally stored inside your enclave sandbox.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Viewer Footer actions */}
              <div className="pt-4 mt-2 shrink-0 border-t border-vault-border/40 flex justify-end gap-3">
                <button 
                  onClick={() => handleOpenShare(activeViewerFile.id)}
                  className="px-4 py-2 bg-vault-accent/15 border border-vault-accent/30 text-vault-accent font-semibold text-xs rounded-lg hover:bg-vault-accent/25 hover:border-vault-accent/50 transition flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Crypt Link
                </button>
                <button 
                  onClick={() => setActiveViewerFile(null)}
                  className="px-4 py-2 bg-vault-dark border border-vault-border hover:border-slate-500 text-slate-300 font-semibold text-xs rounded-lg transition"
                >
                  Dismiss Viewer
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 6. Clickable Metric Detail Overlay Modal */}
        {activeMetricDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <div 
              className="absolute inset-0 bg-vault-bg/85 backdrop-blur-sm transition-opacity"
              onClick={() => setActiveMetricDetail(null)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-vault-panel border border-vault-border rounded-xl w-[92%] sm:w-full max-w-sm p-6 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-glow transform transition-all animate-scale-up">
              
              <div className="flex justify-between items-center border-b border-vault-border/40 pb-3 mb-5">
                <h3 className="font-bold text-xs text-white flex items-center gap-2 select-none tracking-wider uppercase">
                  <Activity className="h-4.5 w-4.5 text-vault-accent" />
                  System Metric Details
                </h3>
                <button 
                  onClick={() => setActiveMetricDetail(null)} 
                  className="text-slate-400 hover:text-white transition"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-4 text-center py-2">
                <div className="h-12 w-12 rounded-xl bg-vault-accent/10 border border-vault-accent/25 flex items-center justify-center text-vault-accent mx-auto active-glow">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="font-bold text-white text-sm tracking-wide uppercase font-display select-none">{activeMetricDetail.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed text-left bg-vault-darker/70 p-4 rounded-lg border border-vault-border/50 font-mono">
                    {activeMetricDetail.description}
                  </p>
                </div>
              </div>

              {/* Dismiss Button */}
              <div className="flex justify-end pt-2 border-t border-vault-border/40 mt-5">
                <button 
                  type="button" 
                  onClick={() => setActiveMetricDetail(null)}
                  className="px-5 py-2 bg-vault-accent text-vault-dark font-extrabold text-xs rounded-lg hover:bg-vault-accent/90 transition shadow-[0_0_12px_rgba(34,211,238,0.25)] hover-glow"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
