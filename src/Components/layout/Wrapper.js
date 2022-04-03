const Wrapper = ({darkMode, children}) => {
  return (
    <main id="wrapper" className={ darkMode ? 'dark': '' }>
      { children }
    </main>
  )
}

export default Wrapper