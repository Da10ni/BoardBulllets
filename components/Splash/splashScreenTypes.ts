export interface SplashScreenProps {
  onComplete?: () => void; // Callback jab splash complete ho
}

export interface SplashData {
  id: number;
  icon?: string; // Optional icon path or URI
  title: string; // Main heading text
  subtitle: string; // Description or caption
  isLogo?: boolean; // If true, show app logo
  showAuthButtons?: boolean; // Show LOGIN/SIGNUP buttons?
}
