import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {getBooks, setStateQuery} from '../actions/book';
import {getCategories} from '../actions/category';

import Book from '../content/Book';
import Preloader from '../content/Preloader';
import './styles/library.css';


const Library = ({ books, categories, getBooks, getCategories, setStateQuery, isLoading: booksLoading, isFiltering: filteringBooks }) => {

    // let [selectedFilter, setSelectedFilter] = useState(''); 
    // let [filter, setFilter] = useState('');
    let [query, setQuery] = useState('');
    let [dropDownShow, setDropDownShow] = useState(false);
   
    useEffect(() => {
        document.title = 'Word Study | Library'
        getBooks();
        getCategories();
    }, [getBooks, getCategories]);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        setStateQuery(e.target.value);
    }

    return ( 
        <section className='library-section'>
            <header className='library-banner'>
                <div className=''>
                    <main className='breadcrumbs-wrapper mb-3'>
                        <h2 className="mb-2 bread">Library</h2>
                        <p className="breadcrumbs"><span className="mr-2"><Link to="/">Home</Link></span> / <span>Library</span></p>
                    </main>
                    <form className="query-form" onSubmit={e => e.preventDefault()}>
                        <div className="query-form-field-sect d-flex justify-content-between">
                            <input type="text" value={query} onChange={handleQueryChange} name="query" id="query" placeholder="search..." className="" />
                            <button className=''><i className='fas fa-search'></i></button>
                        </div>
                    </form>
                </div>
            </header>
            <div className='container'>
                <header className="library-filter-section d-flex justify-content-between align-items-center py-4">
                    <p className="p-0 m-0 text-dark text-capitalize text-lg-left text-md-left text-sm-center text-center">Category:- <span className='text-app-theme font-italic'>All</span></p>
                    <div className={`filter-dropdown ${dropDownShow ? 'show' : ''}`}>
                        <Link to="#" onClick={() => setDropDownShow(!dropDownShow)} className="filter-link">Filters <i className='fas fa-filter'></i></Link> 
                        <form className='filter-dropdown-content' onSubmit={e => e.preventDefault()}>
                            <Link to='#' key={0}>
                                <span to="#">All</span> 
                                <input type='checkbox' value='' />                                
                            </Link>   
                            {
                                categories.map(cat => 
                                    <Link to='#' key={cat.id}>
                                        <span to="#">{cat.name}</span> 
                                        <input type='checkbox' value={cat.id} />                                
                                    </Link>    
                                )
                            }
                            <button className='filter-submit-btn' type='submit'>apply</button>
                        </form>
                    </div>
        
                </header>
                <main className='library-content'>
                    {
                        (booksLoading || filteringBooks)
                        ?
                        <Preloader size='md' /> 
                        :
                        !filteringBooks && books.length === 0 // incase nothing is found
                        ?
                        <h1 className='shadow-sm p-5 bg-white text-center' style={{gridColumn: '1/4'}}>Oops!<br/>Nothing Found</h1>
                        : 
                        books.map(book => 
                            <Book key={book.id} data={book} />
                        )
                    }
                </main>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    books: state.book.books,
    isLoading: state.book.isLoading,
    categories: state.category.categories,
    isFiltering: state.book.filters.isFiltering
});
 
export default connect(mapStateToProps, {getBooks, getCategories, setStateQuery})(Library);