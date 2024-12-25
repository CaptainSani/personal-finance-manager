const categories = {
    shopping: ['supermarket', 'grocery', 'store', 'foodstuffs'],
    utilities: ['electricity', 'water', 'gas', 'blacktax'],
    entertainment: ['cinema', 'football', 'game', 'beach', 'club', 'tgif'],
    transport: ['uber', 'bolt', 'in-drive', 'bus'],
    subscription: ['data', 'dstv', 'gotv', 'gym', 'netflix', 'primetv', 'amazontv', 'appletv']
  };
  
  const autoCategorize = (narration) => {
    for (const category in categories) {
      if (categories[category].some((keyword) => narration.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'others', 'miscellaneous';
  };
  
  module.exports = { autoCategorize };
  