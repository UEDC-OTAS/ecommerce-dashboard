// Delivery configuration structure
export const createDeliveryConfig = (data = {}) => ({
  city: data.city || "",
  township: data.township || "",
  deliveryFee: data.deliveryFee || 0,
  additionalWeightCharge: data.additionalWeightCharge || 0,
  reachable: data.reachable !== undefined ? data.reachable : true,
});

// Form validation errors structure
export const createFormErrors = () => ({
  city: undefined,
  township: undefined,
  deliveryFee: undefined,
});
