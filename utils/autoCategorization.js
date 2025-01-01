const categories = {
  shopping: ['supermarket', 'grocery', 'store', 'foodstuffs', 'clothes', 'mall', 'boutique', 'retail', 'essentials'],
  utilities: ['electricity', 'water', 'gas', 'laundry', 'garbage', 'power', 'sewage', 'heating', 'cable bill'],
  entertainment: ['cinema', 'football', 'game', 'beach', 'club', 'tgif', 'date night', 'concert', 'karaoke', 'sports'],
  transport: ['uber', 'bolt', 'in-drive', 'bus', 'train', 'cab', 'taxi', 'fare', 'metro', 'parking'],
  subscription: ['data', 'dstv', 'gotv', 'gym', 'netflix', 'spotify', 'audible', 'membership', 'cloud'],
  dining: ['restaurant', 'dinner', 'breakfast', 'lunch', 'coffee', 'café', 'bar', 'fast food', 'snack', 'takeaway'],
  health: ['doctor', 'hospital', 'pharmacy', 'medication', 'prescription', 'therapy', 'testing', 'wellness', 'clinic'],
  fitness: ['gym', 'yoga', 'trainer', 'exercise', 'weights', 'running', 'cycling', 'pilates'],
  education: ['tuition', 'school', 'college', 'books', 'course', 'certificate', 'exam', 'training', 'learning'],
  technology: ['laptop', 'phone', 'tablet', 'smartwatch', 'repair', 'software', 'hardware', 'accessories'],
  travel: ['flight', 'hotel', 'visa', 'resort', 'vacation', 'Airbnb', 'road trip', 'booking'],
  family: ['children', 'spouse', 'partner', 'baby', 'toys', 'nanny', 'anniversary', 'wedding', 'family'],
  household: ['cleaning', 'furniture', 'homeware', 'plumbing', 'renovation', 'painting', 'appliances', 'decor'],
  finance: ['bank', 'interest', 'savings', 'wallet', 'loan', 'crypto', 'investment', 'stocks', 'transfer'],
  charity: ['donation', 'charity', 'ngo', 'church', 'mosque', 'fund', 'relief', 'tithes', 'sponsor'],
  personalCare: ['skincare', 'cosmetics', 'spa', 'salon', 'nails', 'makeup', 'massage', 'waxing', 'perfume'],
  gifts: ['gifts', 'birthday', 'celebration', 'hampers', 'goodwill'],
  blackTax: ['friends', 'family', 'relatives', 'assistance', 'stipend', 'society', 'community'],
  savings: ['savings', 'deposit', 'investment', 'mutual funds', 'bonds', 'crypto', 'wallet'],
  insurance: ['insurance', 'policy', 'cover', 'plan', 'premium'],
  luxury: ['designer', 'luxury', 'premium', 'high-end', 'indulgence', 'extravagant'],
  taxation: ['tax', 'fine', 'levy', 'government', 'customs', 'fee', 'license'],
  others: ['random', 'uncategorized', 'unknown', 'emergency', 'others', 'miscellaneous']
};

const autoCategorize = (narration) => {
  for (const category in categories) {
    if (categories[category].some((keyword) => narration.toLowerCase().includes(keyword))) {
      return category;
    }
  }
  return 'others';
};

module.exports = { autoCategorize };

  