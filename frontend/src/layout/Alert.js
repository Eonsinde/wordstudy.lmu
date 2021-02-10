import react from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';



class Alert extends react.Component {
    componentDidUpdate(prevProps){
        if (prevProps.message !== this.props.message){
            if (this.props.message.loggedIn){
                Toast.fire({
                    icon: 'success',
                    title: this.props.message.loggedIn,
                })
            }

            // for books
            if (this.props.message.addedBook){
                Toast.fire({
                    icon: 'success',
                    title: this.props.message.addedBook,
                })
            }
            if (this.props.message.deletedBook){
                Toast.fire({
                    icon: 'success',
                    title: this.props.message.deletedBook,
                })
            }
            if (this.props.message.updatedBook){
                Toast.fire({
                    icon: 'success',
                    title: this.props.message.updatedBook
                })
            }

            if (this.props.message.loginFailed){
                ToastCenter.fire({
                    icon: 'error',
                    title: this.props.message.loginFailed,
                    text: 'Incorrect Credentials'
                })
            }

            if(this.props.message.failed){
                Toast.fire({
                    icon: 'error',
                    title: this.props.message.failed,
                })
            }
        }

        if (prevProps.error !== this.props.error){
            if (this.props.error.msg.non_field_errors){
                ToastCenter.fire({
                    icon: 'error',
                    title: this.props.error.msg.non_field_errors[0]
                })
            }
        }
    }

    render() { 
        return (
            <>
            </>
        );
    }
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const ToastCenter = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
 
const mapStateToProps = state => ({
    message: state.message,
    error: state.error
});

export default connect(mapStateToProps)(Alert);