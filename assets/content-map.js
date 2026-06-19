// assets/content-map.js

// 站点内容分区与关键词标签配置
const siteConfig = {
  baseUrl: "https://aiyouximain.com.cn",
  siteName: "爱游戏",
  primaryKeywords: ["爱游戏", "游戏推荐", "玩家社区"]
};

// 内容分区数据
const contentSections = [
  {
    id: "news",
    title: "游戏资讯",
    tags: ["爱游戏", "新游发布", "行业动态"],
    items: [
      { title: "夏季游戏节参展作品公布", url: "/news/summer-fest-2024", date: "2024-06-01" },
      { title: "独立游戏开发者访谈", url: "/news/indie-dev-interview", date: "2024-05-28" }
    ]
  },
  {
    id: "reviews",
    title: "游戏评测",
    tags: ["爱游戏", "测评", "攻略"],
    items: [
      { title: "《星之回响》深度评测", url: "/reviews/echo-of-stars", date: "2024-06-10" },
      { title: "新手入门指南：策略类游戏", url: "/reviews/strategy-guide", date: "2024-06-05" }
    ]
  },
  {
    id: "community",
    title: "玩家社区",
    tags: ["爱游戏", "讨论", "分享"],
    items: [
      { title: "本周热门话题投票", url: "/community/poll-weekly", date: "2024-06-12" },
      { title: "玩家创作展示：同人绘画", url: "/community/fan-art-gallery", date: "2024-06-08" }
    ]
  }
];

/**
 * 根据关键词搜索内容分区和文章
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的结果列表，每项包含 section, article 和匹配标签
 */
function searchContent(query) {
  if (!query || query.trim() === "") return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  contentSections.forEach(section => {
    // 检查分区标签是否匹配
    const matchingTags = section.tags.filter(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );

    // 检查分区内文章标题或标签是否匹配
    section.items.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const urlMatch = item.url.toLowerCase().includes(lowerQuery);
      const itemTagsMatch = section.tags.some(tag =>
        tag.toLowerCase().includes(lowerQuery)
      );

      if (titleMatch || urlMatch || itemTagsMatch) {
        results.push({
          section: section.title,
          article: item,
          matchedTags: matchingTags.length > 0 ? matchingTags : section.tags
        });
      }
    });
  });

  return results;
}

/**
 * 按标签筛选所有文章
 * @param {string} tag - 目标标签
 * @returns {Array} 包含该标签的文章列表
 */
function filterByTag(tag) {
  const filtered = [];
  contentSections.forEach(section => {
    if (section.tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
      section.items.forEach(item => {
        filtered.push({
          section: section.title,
          title: item.title,
          url: item.url,
          date: item.date
        });
      });
    }
  });
  return filtered;
}

/**
 * 获取所有唯一标签（用于标签云或筛选器）
 * @returns {Array} 去重后的标签数组
 */
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

/**
 * 格式化日期为友好字符串（示例辅助函数）
 * @param {string} dateStr - 日期字符串 YYYY-MM-DD
 * @returns {string} 格式化后的日期
 */
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  const months = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  return `${year}年${months[parseInt(month)-1]}${parseInt(day)}日`;
}

// 简单演示：搜索 "爱游戏"
const demoSearch = searchContent("爱游戏");
console.log(`搜索 "爱游戏" 找到 ${demoSearch.length} 条结果:`);
demoSearch.forEach(r => {
  console.log(`  [${r.section}] ${r.article.title} (${formatDate(r.article.date)})`);
});

// 示例：获取所有标签
console.log("所有标签:", getAllTags().join(", "));

// 示例：按标签筛选
const tagFiltered = filterByTag("攻略");
console.log(`包含 "攻略" 标签的文章:`, tagFiltered.map(i => i.title).join(", "));

// 导出（可选，供模块使用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    searchContent,
    filterByTag,
    getAllTags,
    formatDate
  };
}