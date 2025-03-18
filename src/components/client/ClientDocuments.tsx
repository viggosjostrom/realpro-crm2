import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar
} from '@mui/material';
import {
  Description as DocumentIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Apartment as PropertyIcon,
  Receipt as OfferIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { Document } from '@/lib/types';
import { mockDocuments, mockOffers, mockProperties, mockUsers } from '@/lib/utils/mockData';

interface ClientDocumentsProps {
  clientId: string;
  formatDate: (date: Date) => string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId, formatDate }) => {
  // State for document viewer dialog
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Direct documents related to the client
  const directClientDocuments = mockDocuments.filter(
    doc => doc.relatedToType === 'client' && doc.relatedToId === clientId
  );

  // Get client properties (as seller or buyer)
  const clientProperties = mockProperties.filter(
    property => property.ownerId === clientId || property.buyerId === clientId
  );
  
  // Get client's property documents
  const propertyDocuments = mockDocuments.filter(
    doc => clientProperties.some(property => property.id === doc.propertyId)
  );
  
  // Get client offers
  const clientOffers = mockOffers.filter(offer => offer.buyerId === clientId);
  
  // Get client's offer documents
  const offerDocuments = mockDocuments.filter(
    doc => 
      doc.relatedToType === 'offer' && 
      clientOffers.some(offer => offer.id === doc.relatedToId)
  );
  
  // Combine all documents and remove duplicates
  const allClientDocuments = [
    ...directClientDocuments,
    ...propertyDocuments,
    ...offerDocuments
  ].filter((doc, index, self) => 
    index === self.findIndex(d => d.id === doc.id)
  );
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <DocumentIcon color="primary" />;
      case 'offer_letter':
        return <OfferIcon color="secondary" />;
      case 'loan_approval':
        return <FileIcon color="success" />;
      case 'inspection':
        return <FileIcon color="warning" />;
      default:
        return <PdfIcon color="action" />;
    }
  };
  
  // Get document chip color based on type
  const getDocumentChipColor = (type: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (type) {
      case 'contract':
        return 'primary';
      case 'offer_letter':
        return 'secondary';
      case 'loan_approval':
        return 'success';
      case 'inspection':
        return 'warning';
      case 'agreement':
        return 'info';
      case 'insurance':
        return 'error';
      default:
        return 'default';
    }
  };

  // Format file size to human-readable string
  const formatFileSize = (sizeInKB: number): string => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
  };

  // Get document relation information
  const getRelationInfo = (doc: Document) => {
    if (doc.relatedToType === 'client' && doc.relatedToId === clientId) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Personal document
          </Typography>
        </Box>
      );
    } else if (doc.relatedToType === 'offer') {
      const relatedOffer = mockOffers.find(offer => offer.id === doc.relatedToId);
      if (relatedOffer) {
        const property = mockProperties.find(p => p.id === relatedOffer.propertyId);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OfferIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Offer for {property ? property.address : 'Unknown Property'}
            </Typography>
          </Box>
        );
      }
    }
    
    // Default - property document
    const property = mockProperties.find(p => p.id === doc.propertyId);
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PropertyIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          {property ? property.address : 'Unknown Property'}
        </Typography>
      </Box>
    );
  };

  // Get user by ID
  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
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

  if (allClientDocuments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1">No documents found for this client.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Client Documents ({allClientDocuments.length})
      </Typography>
      
      <Grid container spacing={3}>
        {allClientDocuments.map(doc => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getDocumentIcon(doc.type)}
                    <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 'medium' }}>
                      {doc.title}
                    </Typography>
                  </Box>
                  <Chip 
                    label={doc.type.replace('_', ' ')} 
                    size="small" 
                    color={getDocumentChipColor(doc.type)}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {doc.description || 'No description available'}
                </Typography>
                
                {getRelationInfo(doc)}
                
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                  {doc.tags?.map(tag => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded: {formatDate(doc.uploadedAt)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(doc.fileSize)}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0', p: 1 }}>
                <Tooltip title="View document">
                  <IconButton size="small" color="primary" onClick={() => handleViewDocument(doc)}>
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download document">
                  <IconButton size="small" color="primary">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Document Viewer Dialog */}
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
                        {selectedDocument.fileUrl?.endsWith('.pdf') ? (
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
                        label={selectedDocument.type.replace('_', ' ')} 
                        color={getDocumentChipColor(selectedDocument.type)}
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
                    
                    {/* Document relation info */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">Related to</Typography>
                      {getRelationInfo(selectedDocument)}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleViewDialogClose}>Close</Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ClientDocuments; 