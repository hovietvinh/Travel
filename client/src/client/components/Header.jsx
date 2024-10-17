import { RxHamburgerMenu} from "react-icons/rx";
import { CiSearch} from "react-icons/ci";
import { FaRegUserCircle} from "react-icons/fa";
import { MdTravelExplore} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const stateUser = useSelector(state=>state.UserReducer)
    // console.log(stateUser.userInfo!={}?"true":"false")
    // console.log()

    return (
        <>
            <header className=' flex justify-between'>
               
                <NavLink to="/" className={"flex items-center gap-1 "}>
                    <MdTravelExplore size={30}/>
                    <span className='font-bold text-xl'>Travel.</span>
                </NavLink>

                <div className='flex sm:hidden gap-2 border items-center border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
                    <div>AnyWhere</div>
                    <div className='border-l border-black-300 pl-2'>AnyTime</div>
                    <div className='border-l pl-2 border-black-300'>AnyGuests</div>
                    <button className='bg-[#f5385d] text-white p-1 rounded-full'>
                    <CiSearch size={15}/>

                    </button>
                </div>
                <Link to={Object.keys(stateUser.userInfo).length === 0?`/login`:"/user/profile"} className='flex gap-2 border items-center border-gray-300 rounded-full py-2 px-4 '>
                    <RxHamburgerMenu size={18}/>
                    <div>
                        <FaRegUserCircle size={23}/>
                    </div>
                    {!!stateUser.userInfo &&(
                        <div>
                            {stateUser.userInfo.userName}
                        </div>
                    )}
                </Link>

            </header>
        </>
    );
}

export default Header;