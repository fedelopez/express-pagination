import React, {Component} from 'react';
import Axios from 'axios';

class MovieList extends Component {
    state = {
        count: 0,
        offset: 0,
        movies: []
    };

    handlePrevious = (e) => {
        e.preventDefault();
        const newOffset = Math.max(0, this.state.offset - 25);
        Axios.get('/api/movies', {params: {offset: newOffset}})
            .then(result => {
                this.setState({count: result.data.count, offset: newOffset, movies: result.data.rows})
            });
    };

    handleNext = (e) => {
        e.preventDefault();
        const newOffset = Math.min(this.state.count, this.state.offset + 25);
        Axios.get('/api/movies', {params: {offset: newOffset}})
            .then(result => {
                this.setState({count: result.data.count, offset: newOffset, movies: result.data.rows})
            });
    };

    currentPage = () => Math.floor(this.state.offset / 25);

    totalPages = () => Math.floor(this.state.count / 25);

    componentDidMount() {
        Axios.get('/api/movies', {params: {offset: this.state.offset}})
            .then(result => {
                this.setState({count: result.data.count, movies: result.data.rows})
            });
    }

    render() {
        const movieList = this.state.movies.map((item, key) =>
            <div className='movie-row' key={key}>
                <div className='movie-title'><a href={'/movies/' + item['id']}>{item['movie_title']}</a></div>
                <div className='movie-score'>{item['imdb_score']}</div>
            </div>
        );
        return (
            <div>
                <h1>Top Rated Movies</h1>
                {movieList}
                <div className='page-container'>
                    {this.currentPage() > 0 ? <a href='#' onClick={this.handlePrevious}>Previous</a> :
                        <div>Previous</div>}
                    <div className='page-total'>Total: {this.state.count},
                        page {this.currentPage()} of {this.totalPages()}</div>
                    {this.currentPage() < this.totalPages() ? <a href='#' onClick={this.handleNext}>Next</a> :
                        <div>Next</div>}
                </div>
            </div>
        );
    }
}

export default MovieList;