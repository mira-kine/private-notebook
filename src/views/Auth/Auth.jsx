import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';
import { useUser } from '../../context/UserContext';
import { signInUser, signUpUser } from '../../services/users';

import styles from './Auth.css';

export default function Auth({ isSigningUp = false }) {
  const history = useHistory();
  const { setUser } = useUser();

  const handleSubmit = async (email, password) => {
    try {
      // Use isSigningUp to determine whether to sign up or sign in a user
      if (isSigningUp) {
        // If signing up: redirect to /confirm-email
        await signUpUser(email, password);
        history.push('/confirm-email');
      } else {
        // If signing in: set the user ({id, email}) and redirect to /notes
        const resp = await signInUser(email, password);
        setUser({ id: resp.id, email: resp.email });
        history.replace('/profile');
      }

      // Use the corresponding functions from `/services/users` for both cases
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className={styles.authForm}>
      <h2>{isSigningUp ? 'Welcome!' : 'Welcome back!'}</h2>
      <br />

      <UserForm
        onSubmit={handleSubmit}
        label={isSigningUp ? 'Sign Up' : 'Sign In'}
      />

      {isSigningUp ? (
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      ) : (
        <p>
          Need an account? <Link to="/register">Sign Up</Link>
        </p>
      )}
    </section>
  );
}
