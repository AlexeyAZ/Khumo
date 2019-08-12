class News {
  showAllNews = () => {
    const newsList = document.querySelector('.news__part');
    if (newsList) {
      newsList.classList.remove('news__part');
    }
  }
  createSingleNews = ({title, text, date, image}) => {
    return `
      <div class="news__post">
        <div class="news__post-head">
          <h3>${title || ''}</h3>
          <h3>${date || ''}</h3>
        </div>
        ${
          text && text.length > 0 ? text.map(paragraph => `<p>${paragraph}</p>`).join('') : ''
        }
        ${image ? (
          `<div class="news__img">
            <img class="news__img-pic" src=${image} />
          </div>`) : ''}
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
