import '@styles/globals.css'

import Nav from '@components/Nav';
import Provider from '@components/Provider';
//going to import css to entire appln

//we will be caling navbar in layout.jsx coz we want to 
//reuse it across all our pages

//changing metadata of our appln
export const metadata = {
    title: "Promptompia",
    description: 'Discover & Share AI Prompts'
}

//passing children through props
const Rootlayout = ({children}) => {
  return (
    //wrapping everything in html tag
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout;