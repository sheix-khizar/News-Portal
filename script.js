// RSS Feed URLs
const rssFeeds = [
    'https://rss.cnn.com/rss/edition.rss',
    'https://feeds.bbci.co.uk/news/world/rss.xml'
  ];
  
  // Elements
  const newsContainer = document.getElementById('news-container');
  
  // Fetch and Parse RSS Feeds
  async function fetchRSSFeeds() {
    for (const feed of rssFeeds) {
      try {
        const response = await fetch(feed);
        const text = await response.text();
  
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
  
        // Extract News Items
        const items = xmlDoc.querySelectorAll('item');
        items.forEach(item => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const description = item.querySelector('description')?.textContent || 'No description available.';
          const pubDate = item.querySelector('pubDate')?.textContent || 'Unknown date';
  
          // Display News
          displayNews(title, link, description, pubDate);
        });
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
      }
    }
  }
  
  // Display News in HTML
  function displayNews(title, link, description, pubDate) {
    const newsCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <p class="text-muted">Published: ${pubDate}</p>
            <a href="${link}" target="_blank" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    `;
    newsContainer.innerHTML += newsCard;
  }
  
  // Load RSS Feeds on Page Load
  fetchRSSFeeds();
  