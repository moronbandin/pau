const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

  // Static passthrough
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  eleventyConfig.addTransform("prefixRootRelativeLinks", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html") || pathPrefix === "/") {
      return content;
    }

    const prefix = pathPrefix.replace(/\/$/, "");
    return content.replace(/\b(href|src)="\/(?!\/)([^"#?]*)([^"]*)"/g, function (_, attr, urlPath, suffix) {
      return `${attr}="${prefix}/${urlPath}${suffix}"`;
    });
  });

  // ---- Filters ----
  eleventyConfig.addFilter("groupByAuthor", function (texts) {
    const groups = {};
    for (const t of texts) {
      if (!groups[t.authorSlug]) {
        groups[t.authorSlug] = { author: t.author, authorSlug: t.authorSlug, work: t.work, texts: [] };
      }
      groups[t.authorSlug].texts.push(t);
    }
    return Object.values(groups);
  });

  eleventyConfig.addFilter("firstWords", function (str, n) {
    if (!str) return "";
    const words = str.replace(/\s+/g, " ").trim().split(" ");
    return words.slice(0, n || 12).join(" ") + (words.length > (n || 12) ? "…" : "");
  });

  eleventyConfig.addFilter("nl2br", function (str) {
    if (!str) return "";
    return str.replace(/\n/g, "<br>");
  });

  eleventyConfig.addFilter("groupByCat", function (items) {
    const groups = {};
    for (const it of items) {
      if (!groups[it.cat]) groups[it.cat] = [];
      groups[it.cat].push(it);
    }
    return groups;
  });

  eleventyConfig.addFilter("json", function (obj) {
    return JSON.stringify(obj).replace(/</g, "\\u003c");
  });

  eleventyConfig.addFilter("startsWith", function (str, prefix) {
    return typeof str === "string" && str.indexOf(prefix) === 0;
  });

  eleventyConfig.addFilter("groupByYear", function (exams) {
    const groups = {};
    for (const ex of exams || []) {
      if (!groups[ex.ano]) {
        groups[ex.ano] = { ano: ex.ano, sistema: ex.sistema, lei: ex.lei, items: [] };
      }
      groups[ex.ano].items.push(ex);
    }
    return Object.values(groups).sort((a, b) => b.ano - a.ano);
  });

  return {
    pathPrefix,
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
