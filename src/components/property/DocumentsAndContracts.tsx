import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  InputAdornment,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
  Checkbox,
  Divider,
  Avatar
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Upload as UploadIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { Property, Document, DocumentType, User } from '@/lib/types';
import { mockDocuments, mockUsers } from '@/lib/utils/mockData';

// Document props interface
interface DocumentsAndContractsProps {
  property: Property;
}

// Helper function to format file size
const formatFileSize = (sizeInKB: number): string => {
  if (sizeInKB < 1000) {
    return `${sizeInKB} KB`;
  } else {
    return `${(sizeInKB / 1024).toFixed(2)} MB`;
  }
};

// Helper function to format date
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('sv-SE');
};

// Helper function to get document type label
const getDocumentTypeLabel = (type: DocumentType): string => {
  switch (type) {
    case 'contract':
      return 'Contract';
    case 'offer_letter':
      return 'Offer Letter';
    case 'agreement':
      return 'Agreement';
    case 'loan_approval':
      return 'Loan Approval';
    case 'inspection':
      return 'Inspection';
    case 'insurance':
      return 'Insurance';
    case 'tax':
      return 'Tax Document';
    case 'other':
      return 'Other';
    default:
      return type;
  }
};

// Helper function to get document type color
const getDocumentTypeColor = (type: DocumentType): string => {
  switch (type) {
    case 'contract':
      return '#4caf50'; // Green
    case 'offer_letter':
      return '#2196f3'; // Blue
    case 'agreement':
      return '#9c27b0'; // Purple
    case 'loan_approval':
      return '#ff9800'; // Orange
    case 'inspection':
      return '#795548'; // Brown
    case 'insurance':
      return '#00bcd4'; // Cyan
    case 'tax':
      return '#f44336'; // Red
    case 'other':
      return '#757575'; // Grey
    default:
      return '#757575'; // Default Grey
  }
};

// Helper function to get document icon
const getDocumentIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return <PdfIcon color="error" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <ImageIcon color="primary" />;
    default:
      return <FileIcon color="action" />;
  }
};

// Helper function to get user by ID
const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Main component
const DocumentsAndContracts: React.FC<DocumentsAndContractsProps> = ({ property }) => {
  // State for component
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('other');
  const [documentDescription, setDocumentDescription] = useState('');
  
  // Get documents for this property
  const propertyDocuments = mockDocuments.filter(doc => doc.propertyId === property.id);
  
  // Filter documents based on search and filters
  const filteredDocuments = propertyDocuments.filter(doc => {
    const matchesSearch = 
      searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = 
      selectedTypes.length === 0 || 
      selectedTypes.includes(doc.type);
    
    return matchesSearch && matchesType;
  });
  
  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'name_asc':
        return a.title.localeCompare(b.title);
      case 'name_desc':
        return b.title.localeCompare(a.title);
      case 'size_asc':
        return a.fileSize - b.fileSize;
      case 'size_desc':
        return b.fileSize - a.fileSize;
      default:
        return 0;
    }
  });
  
  // Group documents by type for category view
  const documentsByType: Record<string, Document[]> = {};
  propertyDocuments.forEach(doc => {
    if (!documentsByType[doc.type]) {
      documentsByType[doc.type] = [];
    }
    documentsByType[doc.type].push(doc);
  });
  
  // Handle sortMenu open
  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortMenuAnchor(event.currentTarget);
  };
  
  // Handle sortMenu close
  const handleSortMenuClose = () => {
    setSortMenuAnchor(null);
  };
  
  // Handle sort selection
  const handleSortSelect = (sortType: string) => {
    setSortBy(sortType);
    setSortMenuAnchor(null);
  };
  
  // Handle filter change
  const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTypes(event.target.value as string[]);
  };
  
  // Handle upload dialog open
  const handleUploadDialogOpen = () => {
    setOpenUploadDialog(true);
  };
  
  // Handle upload dialog close
  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false);
    setSelectedFile(null);
    setDocumentTitle('');
    setDocumentType('other');
    setDocumentDescription('');
  };
  
  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Auto-fill title based on filename (remove extension)
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setDocumentTitle(fileName);
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle document view
  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setOpenViewDialog(true);
  };
  
  // Handle view dialog close
  const handleViewDialogClose = () => {
    setOpenViewDialog(false);
    setSelectedDocument(null);
  };
  
  // Handle document upload (mock)
  const handleDocumentUpload = () => {
    console.log('Document upload initiated:', {
      title: documentTitle,
      type: documentType,
      description: documentDescription,
      file: selectedFile
    });
    
    // In a real application, this would upload the file to server
    // Here we just close the dialog since it's a mockup
    handleUploadDialogClose();
  };
  
  // Render document table
  const renderDocumentTable = () => {
    if (sortedDocuments.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No documents found for the selected filters.
          </Typography>
        </Box>
      );
    }
    
    return (
      <TableContainer component={Paper} variant="outlined">
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell width="40%"><strong>Document</strong></TableCell>
              <TableCell width="15%"><strong>Type</strong></TableCell>
              <TableCell width="15%"><strong>Size</strong></TableCell>
              <TableCell width="15%"><strong>Uploaded</strong></TableCell>
              <TableCell width="15%"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDocuments.map((document) => {
              const uploader = getUserById(document.uploadedBy);
              return (
                <TableRow key={document.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getDocumentIcon(document.fileUrl)}
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body1">{document.title}</Typography>
                        {document.description && (
                          <Typography variant="caption" color="text.secondary">
                            {document.description}
                          </Typography>
                        )}
                        {document.tags && document.tags.length > 0 && (
                          <Box sx={{ mt: 0.5 }}>
                            {document.tags.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5, fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getDocumentTypeLabel(document.type)} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getDocumentTypeColor(document.type), 
                        color: 'white',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>{formatFileSize(document.fileSize)}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{formatDate(document.uploadedAt)}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        by {uploader ? `${uploader.firstName} ${uploader.lastName}` : 'Unknown'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="View Document">
                        <IconButton size="small" onClick={() => handleViewDocument(document)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  // Render document categories
  const renderDocumentCategories = () => {
    const documentTypes = Object.keys(documentsByType);
    
    if (documentTypes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No documents found for this property.
          </Typography>
        </Box>
      );
    }
    
    return (
      <Grid container spacing={3}>
        {documentTypes.map((type) => (
          <Grid item xs={12} md={6} key={type}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={getDocumentTypeLabel(type as DocumentType)} 
                    sx={{ 
                      backgroundColor: getDocumentTypeColor(type as DocumentType), 
                      color: 'white',
                      fontWeight: 'medium',
                      mr: 1
                    }} 
                  />
                  <Typography variant="h6" component="h3">
                    {documentsByType[type].length} Document{documentsByType[type].length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                {documentsByType[type].map((document, index) => (
                  <Box key={document.id} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    py: 1,
                    borderBottom: index < documentsByType[type].length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
                      {getDocumentIcon(document.fileUrl)}
                      <Box sx={{ ml: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Typography variant="body2" noWrap>{document.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatFileSize(document.fileSize)} • {formatDate(document.uploadedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Tooltip title="View Document">
                        <IconButton size="small" onClick={() => handleViewDocument(document)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Documents & Contracts
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            onClick={handleUploadDialogOpen}
          >
            Upload Document
          </Button>
        </Box>
        
        {/* Search & Filter */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search documents..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="document-type-filter-label">Filter by Type</InputLabel>
                <Select
                  labelId="document-type-filter-label"
                  multiple
                  value={selectedTypes}
                  onChange={handleFilterChange}
                  input={<OutlinedInput label="Filter by Type" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={getDocumentTypeLabel(value as DocumentType)} 
                          size="small"
                          sx={{ 
                            backgroundColor: getDocumentTypeColor(value as DocumentType), 
                            color: 'white',
                            fontWeight: 'medium'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {['contract', 'offer_letter', 'agreement', 'loan_approval', 'inspection', 'insurance', 'tax', 'other'].map((type) => (
                    <MenuItem key={type} value={type}>
                      <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                      <ListItemText primary={getDocumentTypeLabel(type as DocumentType)} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button 
                variant="outlined" 
                startIcon={<SortIcon />}
                onClick={handleSortMenuOpen}
                aria-haspopup="true"
                aria-expanded={Boolean(sortMenuAnchor)}
              >
                Sort
              </Button>
              <Menu
                anchorEl={sortMenuAnchor}
                open={Boolean(sortMenuAnchor)}
                onClose={handleSortMenuClose}
              >
                <MenuItem onClick={() => handleSortSelect('newest')} selected={sortBy === 'newest'}>
                  Newest First
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('oldest')} selected={sortBy === 'oldest'}>
                  Oldest First
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('name_asc')} selected={sortBy === 'name_asc'}>
                  Name (A-Z)
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('name_desc')} selected={sortBy === 'name_desc'}>
                  Name (Z-A)
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('size_asc')} selected={sortBy === 'size_asc'}>
                  Size (Smallest)
                </MenuItem>
                <MenuItem onClick={() => handleSortSelect('size_desc')} selected={sortBy === 'size_desc'}>
                  Size (Largest)
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
        
        {/* Document List */}
        <Box>
          {/* List View */}
          {renderDocumentTable()}
        </Box>
      </Paper>
      
      {/* Category Cards */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Documents by Category
      </Typography>
      {renderDocumentCategories()}
      
      {/* Upload Dialog */}
      <Dialog 
        open={openUploadDialog} 
        onClose={handleUploadDialogClose} 
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Upload New Document</Typography>
            <IconButton onClick={handleUploadDialogClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Property</Typography>
            <Typography variant="body1">{property.address}, {property.city}</Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Select Document</Typography>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <Box 
              sx={{ 
                border: '2px dashed #ccc', 
                borderRadius: 1, 
                p: 3, 
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
              onClick={triggerFileInput}
            >
              {selectedFile ? (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {selectedFile.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedFile.type} • {(selectedFile.size / 1024).toFixed(2)} KB
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <AttachFileIcon sx={{ fontSize: 40, color: '#9e9e9e', mb: 1 }} />
                  <Typography variant="body1">
                    Click to select or drop a file here
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: PDF, Word, Excel, Images
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Document Title"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="document-type-label">Document Type</InputLabel>
                <Select
                  labelId="document-type-label"
                  value={documentType}
                  label="Document Type"
                  onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                >
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="offer_letter">Offer Letter</MenuItem>
                  <MenuItem value="agreement">Agreement</MenuItem>
                  <MenuItem value="loan_approval">Loan Approval</MenuItem>
                  <MenuItem value="inspection">Inspection</MenuItem>
                  <MenuItem value="insurance">Insurance</MenuItem>
                  <MenuItem value="tax">Tax Document</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                value={documentDescription}
                onChange={(e) => setDocumentDescription(e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleDocumentUpload}
            disabled={!selectedFile || !documentTitle}
          >
            Upload Document
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* View Document Dialog */}
      <Dialog 
        open={openViewDialog} 
        onClose={handleViewDialogClose} 
        maxWidth="md"
        fullWidth
      >
        {selectedDocument && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedDocument.title}</Typography>
                <IconButton onClick={handleViewDialogClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ borderRadius: 1, border: '1px solid #eee', p: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', backgroundColor: '#f5f5f5' }}>
                        {selectedDocument.fileUrl.endsWith('.pdf') ? (
                          <Box sx={{ textAlign: 'center' }}>
                            <PdfIcon sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
                            <Typography variant="body1">PDF Document Preview</Typography>
                            <Typography variant="caption" color="text.secondary">
                              For security reasons, PDF preview is not available in this demo.
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: 'center' }}>
                            <ArticleIcon sx={{ fontSize: 80, color: '#2196f3', mb: 2 }} />
                            <Typography variant="body1">Document Preview</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Preview not available in this demo.
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    <Button 
                      fullWidth 
                      variant="contained" 
                      startIcon={<DownloadIcon />}
                      sx={{ mb: 2 }}
                    >
                      Download Document
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Document Details</Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">Type</Typography>
                      <Chip 
                        label={getDocumentTypeLabel(selectedDocument.type)} 
                        sx={{ 
                          backgroundColor: getDocumentTypeColor(selectedDocument.type), 
                          color: 'white',
                          fontWeight: 'medium'
                        }} 
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">Uploaded</Typography>
                      <Typography variant="body2">{formatDate(selectedDocument.uploadedAt)}</Typography>
                      {getUserById(selectedDocument.uploadedBy) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Avatar 
                            src={getUserById(selectedDocument.uploadedBy)?.avatar} 
                            alt="User avatar"
                            sx={{ width: 24, height: 24, mr: 1 }}
                          />
                          <Typography variant="body2">
                            {getUserById(selectedDocument.uploadedBy)?.firstName} {getUserById(selectedDocument.uploadedBy)?.lastName}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">File Size</Typography>
                      <Typography variant="body2">{formatFileSize(selectedDocument.fileSize)}</Typography>
                    </Box>
                    
                    {selectedDocument.description && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                        <Typography variant="body2">{selectedDocument.description}</Typography>
                      </Box>
                    )}
                    
                    {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">Tags</Typography>
                        <Box sx={{ mt: 1 }}>
                          {selectedDocument.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {selectedDocument.relatedToType && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Related to {selectedDocument.relatedToType.charAt(0).toUpperCase() + selectedDocument.relatedToType.slice(1)}
                        </Typography>
                        <Typography variant="body2">
                          ID: {selectedDocument.relatedToId}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">Visibility</Typography>
                      <Chip 
                        label={selectedDocument.isPublic ? 'Public' : 'Private'} 
                        color={selectedDocument.isPublic ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleViewDialogClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DocumentsAndContracts; 