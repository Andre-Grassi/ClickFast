import './styles.css'

function Main() {
  return (  
    <main>
      <h2>Test the <span>speed</span> you click</h2>
      <div className="btn">
        <button onClick={() => console.log('clicked')}>Click</button>
      </div>
    </main>
  );
}
 
export default Main;