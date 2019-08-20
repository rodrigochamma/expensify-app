// Higher Order Component (HOC) - A component (HOC) that renders another component
// Advantages:
// - Reuse code
// - Render hijacking
// - Prop manipulation
// - Abstract state

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Infor</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is privet info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
                <p>Please Login first!</p>
            )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details"/>, document.getElementById('app'));