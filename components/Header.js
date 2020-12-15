import Link from 'next/link'
import Head from 'next/head'
import '../style.css';

const Header = ({title = 'This is the default title' , description="This is default Description !!!" , keywords="This is default Keywords !!!" } ) => (
    <div>
    	<head>
		 	<title>{title}</title>
		 	<meta charSet="utf-8" /> 
		 	<meta name="viewport" key="viewport" content="width=device-width, initial-scale=1" />
		 	<meta name="keywords" content={keywords} />
			<meta name="description" content={description} /> 

		 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		 	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
		 	<script src='/static/js/jquery-1.11.3.min.js'></script>
		 	<link rel='stylesheet' href='/_next/static/style.css' />
		 	
		</head> 
    </div>
)
export default Header
