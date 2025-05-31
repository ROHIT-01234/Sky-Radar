import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-cyan-300 to-blue-300'>

      {/* Header */}
      <Header/>
      <main className='min-h-screen container mx-auto px-4 py-8'>

        {children}
      </main>
      {/* Footer */}
      <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 text-center text-gray-400'>
          <p className='text-xl'>Made by Rohit 🐱‍🏍  </p>
        </div>
      </footer>
    </div>
  )
}
export default Layout;
