const Loading = () => {
  window.scrollTo({top: 0, behavior: 'instant'})
  return (  
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export default Loading