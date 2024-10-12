import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function CardComponent() {
  const cardContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column', // Ensure the title and paragraph are above the cards
	marginTop: '50px', // Adjust the margin as needed
	marginBottom: '100px', // Add margin at the bottom for more space
	gap: '20px' // Adjust the gap between elements as needed
  };

  const titleStyle = {
	marginBottom: '20px', // Space between the title and the paragraph
	textAlign: 'center' // Center the title
  };

  const paragraphStyle = {
	marginBottom: '40px', // Space between the paragraph and the cards
	textAlign: 'center', // Center the paragraph
	maxWidth: '800px' // Limit the width of the paragraph for better readability
  };

  return (
	<div style={cardContainerStyle}>
	  <h2 style={titleStyle}>About Us</h2>
	  <p style={paragraphStyle}>
		Craving delicious, health-conscious meals but short on time? Welcome to Sharecipe, your go-to app for quick and nutritious culinary inspiration! Dive into a world where busy food lovers like you share their favorite speedy recipes, packed with flavor and goodness. From energizing breakfast smoothies to satisfying dinners, discover dishes that fit your hectic lifestyle without compromising on health. Join our vibrant community of home cooks who believe eating well shouldn't be a hassle. With Sharecipe, transform your daily meals into delightful, nourishing adventures – because great food should be both simple and wholesome. Ready to revolutionize your kitchen routine? Let's cook up some magic together!
	  </p>
	  <div style={{ display: 'flex', gap: '20px' }}>
		<Card style={{ width: '18rem', border: '2px solid black' }}> {/* Black border */}
		  <Card.Header>Hafssa</Card.Header>
		  <Card.Body>
			<Card.Title>Backend Wizard</Card.Title>
			<Card.Text>Crafting robust server-side solutions, our backend wizard ensures Sharecipe's data flows smoothly and securely.

			</Card.Text>
		  </Card.Body>
		</Card>
		<Card style={{ width: '18rem', border: '2px solid black' }}> {/* Black border */}
		  <Card.Header>Chaimaa</Card.Header>
		  <Card.Body>
			<Card.Title>Front-end Enthusiast</Card.Title>
			<Card.Text>
            Frontend Developer: Bringing Sharecipe to life with intuitive design, our frontend expert creates the delightful user experience you enjoy every day.
			</Card.Text>
		  </Card.Body>
		</Card>
	  </div>
	</div>
  );
}

export default CardComponent;