import React from 'react';

export const Header = () => {
    return (
        <nav>
            <div className=" nav-wrapper p15 purple darken-3">
                <a href="/" className="brand-logo flex">
                    <div  className="flex">
                    <i className="large material-icons">movie_creation</i>
                    <span className="brand-logo-title">move-discover</span>
                    </div>
                </a>
            </div>
        </nav>
    )
}