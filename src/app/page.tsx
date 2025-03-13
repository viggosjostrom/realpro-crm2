'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Insights as InsightsIcon,
  DeviceHub as DeviceHubIcon
} from '@mui/icons-material';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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

// Use dynamic import with no SSR to prevent hydration issues
const HomeContent = dynamic(() => Promise.resolve(({ 
  textSecondaryColor, 
  dividerColor 
}: { 
  textSecondaryColor: string, 
  dividerColor: string 
}) => {
  // Create features with icons
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
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                >
                  Get Started
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
                alt="RealPro CRM Dashboard"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
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
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
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

      {/* Showcase Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Comprehensive CRM for Every Aspect of Your Business
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                From lead generation to closing deals, RealPro CRM provides all the tools you need to manage your real estate business effectively.
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Client Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Keep track of all your clients, their preferences, and communication history in one place.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Property Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage property listings, track viewings, and monitor the sales process from start to finish.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Lead Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Capture, qualify, and convert leads with our powerful lead management tools.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/crm-showcase.png"
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
            Start Your Free Trial
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
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
              © {new Date().getFullYear()} RealPro CRM. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}), { ssr: false });

export default function Home() {
  // Use a more robust approach for client detection
  const [mounted, setMounted] = useState(false);
  
  // Always call hooks unconditionally
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe access to theme properties only after mounting
  const textSecondaryColor = theme.palette.text.secondary;
  const dividerColor = theme.palette.divider;

  // Simple skeleton loader for server-side rendering
  if (!mounted) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return <HomeContent textSecondaryColor={textSecondaryColor} dividerColor={dividerColor} />;
}
