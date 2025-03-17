'use client';

import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  useTheme
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Insights as InsightsIcon,
  DeviceHub as DeviceHubIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  ContactPhone as ContactPhoneIcon
} from '@mui/icons-material';
import Link from 'next/link';

// Static feature data
const featureData = [
  {
    title: 'Streamlined Workflow',
    description: 'Manage clients, properties, and leads all in one place with our intuitive interface designed for real estate professionals.'
  },
  {
    title: 'Powerful Analytics',
    description: 'Gain valuable insights into your business with comprehensive analytics and reporting tools.'
  },
  {
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security, ensuring your client information stays confidential.'
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools and services for a complete real estate management solution.'
  }
];

// Static features
const features = [
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: featureData[0].title,
    description: featureData[0].description
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    title: featureData[1].title,
    description: featureData[1].description
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: featureData[2].title,
    description: featureData[2].description
  },
  {
    icon: <DeviceHubIcon sx={{ fontSize: 40 }} />,
    title: featureData[3].title,
    description: featureData[3].description
  }
];

// Static component that doesn't use any state or side effects
export default function Home() {
  // Use theme directly without any state or side effects
  const theme = useTheme();
  
  // Static values for colors
  const textSecondaryColor = theme.palette.text.secondary;
  const dividerColor = theme.palette.divider;

  // Handle navigation to dashboard safely
  const handleDashboardNavigation = () => {
    try {
      // Use sessionStorage instead of localStorage
      sessionStorage.setItem('fromLandingPage', 'true');
    } catch {
      // Silent error handling
    }
  };

  // Remove the random key to prevent remounting issues
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Modern Real Estate Management for Swedish Agents
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', opacity: 0.9 }}>
                RealPro CRM helps you manage clients, properties, and leads with ease, so you can focus on what matters most - closing deals.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  href="/dashboard"
                  onClick={handleDashboardNavigation}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                >
                  Start Demo
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="/home/dashboard-1.jpg"
                alt="RealPro CRM Features"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
        
        {/* Background decorations */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -100, 
            right: -100, 
            width: 400, 
            height: 400, 
            borderRadius: '50%', 
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: -150, 
            left: -150, 
            width: 300, 
            height: 300, 
            borderRadius: '50%', 
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }} 
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Designed for Swedish Real Estate Professionals
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Our platform is tailored to the unique needs of the Swedish real estate market, helping agents manage both buyers and sellers efficiently.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%', 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ 
                    color: 'primary.main', 
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Meet the Developer Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/home/viggo.jpg"
                alt="Viggo Sjöström - Developer"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60%',
                    height: '4px',
                    bottom: '-12px',
                    left: 0,
                    backgroundColor: 'primary.main',
                    borderRadius: '2px'
                  }
                }}
              >
                Meet the Developer
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 4, mt: 4, fontSize: '1.1rem' }}
              >
                Viggo Sjöström worked several years as a real estate agent in Sweden, gaining first-hand experience in the fast-paced industry. After years of working with CRM systems daily, he recognized the potential to improve and streamline workflows through technology. This passion led him to pursue a career in software development, focusing on creating intuitive and powerful tools for professionals. Today, he works as a full-stack developer at RealPro CRM, combining his industry expertise with modern technology to build innovative solutions.
              </Typography>
              
              <Box 
                sx={{ 
                  my: 4,
                  mx: 2,
                  p: 3,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(25, 118, 210, 0.05)',
                  borderRadius: '0 8px 8px 0'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'text.primary',
                    lineHeight: 1.6
                  }}
                >
                  &ldquo;I&apos;ve always been passionate about technology and problem-solving. For me, development isn&apos;t just about writing code—it&apos;s about creating tools that genuinely make a difference in people&apos;s daily work. I love building solutions that are both powerful and user-friendly, making complex tasks feel effortless.&rdquo;
                </Typography>
                <Typography 
                  variant="subtitle1"
                  sx={{ 
                    mt: 2,
                    textAlign: 'right',
                    fontWeight: 500,
                    color: 'primary.main'
                  }}
                >
                  — Viggo Sjöström
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mt: 4, fontSize: '1.1rem' }}
              >
                With a deep understanding of both real estate and software development, Viggo bridges the gap between industry needs and technical innovation. His goal is to develop CRM systems that enhance efficiency, improve client relationships, and provide real value.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Showcase Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '60%',
                    height: '4px',
                    bottom: '-12px',
                    left: 0,
                    backgroundColor: 'primary.main',
                    borderRadius: '2px'
                  }
                }}
              >
                Comprehensive CRM for Every Aspect of Your Business
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 5, mt: 4, fontSize: '1.1rem' }}
              >
                From lead generation to closing deals, RealPro CRM provides all the tools you need to manage your real estate business effectively.
              </Typography>
              
              <Box
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transform: 'translateY(-4px)',
                      '& .feature-title': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      mr: 2
                    }}
                  >
                    <PeopleIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      className="feature-title"
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Client Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Keep track of all your clients, their preferences, and communication history in one place.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transform: 'translateY(-4px)',
                      '& .feature-title': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      mr: 2
                    }}
                  >
                    <HomeIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      className="feature-title"
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Property Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Manage property listings, track viewings, and monitor the sales process from start to finish.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transform: 'translateY(-4px)',
                      '& .feature-title': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      mr: 2
                    }}
                  >
                    <ContactPhoneIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      className="feature-title"
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Lead Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Capture, qualify, and convert leads with our powerful lead management tools.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/home/property-dashboard.jpg"
                alt="RealPro CRM Features"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            Ready to Transform Your Real Estate Business?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
            Join thousands of Swedish real estate agents who are already using RealPro CRM to grow their business.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            component={Link}
            href="/dashboard"
            onClick={handleDashboardNavigation}
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Try Out The Demo
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                RealPro CRM
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A modern, user-friendly CRM system designed specifically for real estate agents in the Swedish market.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Product
              </Typography>
              <Stack spacing={1}>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Features</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Pricing</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Testimonials</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Documentation</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Guides</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Support</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">About</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Blog</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Careers</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Privacy Policy</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Terms of Service</Typography>
                </Link>
                <Link href="#" style={{ textDecoration: 'none', color: textSecondaryColor }}>
                  <Typography variant="body2">Cookie Policy</Typography>
                </Link>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6, pt: 3, borderTop: `1px solid ${dividerColor}`, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 RealPro CRM. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
