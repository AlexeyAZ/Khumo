class News {
  createSingleNews = ({title, text}) => {
    return `
      <div class="news__post">
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
    `;
  }
  getNewsHtml = data => {
    return `
      <div>
        ${data.map(item => this.createSingleNews(item)).join('')}
      </div>
    `;
  }
}

export default News;
