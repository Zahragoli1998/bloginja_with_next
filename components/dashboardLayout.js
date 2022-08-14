import React from 'react'
import SideBar from './sidebar'

const DashboardLayout = ({children}) => {
	return (
		<div className='flex flex-row-reverse'>
			<SideBar/>
			<div className='w-full'>{children}</div>
		</div>
	)
}

export default DashboardLayout