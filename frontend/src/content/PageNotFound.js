


const PageNotFound = () => {
    return ( 
        <section style={{ padding: '100px 0', height: '500px'}}>
            <div className='bg-white m-auto d-flex justify-content-center align-items-center flex-column' style={{height: '100%', width: '80%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <i className='fas text-primary fa-glasses fa-4x'></i>
                <br/>
                <h1 className='text-center text-dark'>Oops! <br/>Page Not Found</h1>
            </div>
        </section>
    );
}
 
export default PageNotFound;