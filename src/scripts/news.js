class News {
  showAllNews = () => {
    const newsList = document.querySelector('.news__part');
    if (newsList) {
      newsList.classList.remove('news__part');
    }
    
  }
  createSingleNews = ({title, text, date}) => {
    return `
      <div class="news__post">
        <div class="news__post-head">
          <h3>${title}</h3>
          <h3>${date}</h3>
        </div>
        ${text.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </div>
    `;
  }
  getNewsHtml = data => {
    this.showAllNews();
    return `
      <div class="news__part">
        ${data.map(item => this.createSingleNews(item)).join('')}
      </div>
    `;
  }
}

export default News;
