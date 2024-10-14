import React from 'react';

function Profile(props) {
    return (
        <>
            <div className='text-center max-w-lg mx-auto'>
                Logged in as {stateAuth.userInfo.userName} ({stateAuth.userInfo.email})
                <button onClick={handleLogout} className=' bg-[#f5385d] max-w-sm mt-2 p-1 w-full text-white rounded-2xl'>Log out</button>
            </div>
        </>
    );
}

export default Profile;