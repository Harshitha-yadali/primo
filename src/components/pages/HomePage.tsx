const handleFeatureClick = (feature: Feature) => {
  // If the feature doesn't require authentication, just navigate
  if (!feature.requiresAuth) {
    onPageChange(feature.id);
    return;
  }

  // If the feature requires authentication and the user is NOT authenticated,
  // prompt them to sign in.
  if (!isAuthenticated) {
    onShowAuth();
    return;
  }

  // Now we know the user is authenticated, so we check their subscription status.
  // If the user has a subscription AND the feature is available (has credits),
  // then navigate to the feature page.
  if (userSubscription && isFeatureAvailable(feature.id)) {
    onPageChange(feature.id);
    return;
  }

  // If the user is authenticated but the feature is NOT available (out of credits),
  // show the subscription plans page.
  onShowSubscriptionPlans();
};