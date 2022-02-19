

class DataService {
    url = 'https://api.giphy.com/v1/gifs/search';
    auth = 'RRtWLQ3khkn7l5hgR2OdBvwZQJbgffYU';
    keyword = 'nature';
    fullUrl = '';

    get(keyword = this.keyword, limit = 50, lang = 'en', rating = 'g') {
        this.fullUrl = `${this.url}?api_key=${this.auth}&limit=${limit}&q=${keyword}&lang=${lang}&rating=${rating}`;
        return new Promise((resolve, reject) => {
            fetch(this.fullUrl)
                .then(res => {
                    resolve(res.json());
                })
                .catch(res => {
                    reject(res);
                });
        });
    }

}