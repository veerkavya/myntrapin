import React, { useState, useEffect } from 'react';
import './BoxLayout.css'; // Import your CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';

const BoxLayout = ({ wish,setwish,user, images, Ps, setImages }) => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const { productId } = useParams();
  const [showPinAlert, setShowPinAlert] = useState(false);
  const [showBoardAlert, setShowBoardAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards(); // Fetch boards when component mounts
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${user}/boardsuser`);
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
      const data = await response.json();
      setBoards(data); // Assuming the response data structure is { boards: [...] }
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleBoardClick = async (boardId) => {
    const product = Ps.filter(product => product.id ==productId)[0];
    console.log(productId)
    if (product) {
      try {
        const response = await fetch('http://127.0.0.1:5000/createpins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
            title: product.title,
            image_url: product.image_url,
            description: product.desc,
            user_id: user,
            board_id: parseInt(boardId, 10),
           
            myntraid:productId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create pin');
        }

        const data = await response.json();
        console.log('New pin created:', data.message);
        setImages(prevImages => [
          ...prevImages,
          {
            title: product.title,
            image_url: product.image_url,
            description: product.desc,
            user_id: user,
            board_id: parseInt(boardId, 10),
            myntra:1,
            myntraid:productId
          }
        ]);
        await fetchBoards();
        setShowPinAlert(true); // Show pin created alert
        setTimeout(() => setShowPinAlert(false), 2000);
        console.log("wish",wish) // Hide after 3 seconds
        if(!wish){navigate(`/billing/${productId}`)} // Navigate to the billing page
        else{
          setTimeout(() => navigate(`/`), 1000);
        }
      } catch (error) {
        console.error('Error creating pin:', error);
      }
    } else {
      console.log('Product ID is null, handle click without product ID.');
    }
  };

  const handleCreateBoard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/createboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newBoardName.trim(),
          user_id: user,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create board');
      }

      const data = await response.json();
      console.log('New board created:', data.message);
      await fetchBoards();
      setShowBoardAlert(true); // Show board created alert
      setTimeout(() => setShowBoardAlert(false), 3000); // Hide after 3 seconds
      setNewBoardName('');

    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className='boxl'>
      {/* Pin creation success alert */}
      {showPinAlert && <div className="alert show">
        <span className="alert-message">Pin created successfully!</span>
      </div>}

      {/* Board creation success alert */}
      {showBoardAlert && <div className="alert show">
        <span className="alert-message">Board created successfully!</span>
      </div>}

      <h2 className="w">Choose Board To Pin!</h2>
      {boards.map((board, index) => (
        <div className="board-container" key={index} onClick={() => handleBoardClick(board.id)}>
          <div className="box-container">
            <div className="image-container">
              <div className="left-pane">
                {board.pins[0]?.image_url && (<img src={board.pins[0]?.image_url} alt="Pin 1" />)}
              </div>
              <div className="right-pane">
                <div className="upper-right">
                  {board.pins[1]?.image_url && (<img src={board.pins[1]?.image_url} alt="Pin 2" />)}
                </div>
                <div className="lower-right">
                  {board.pins[2]?.image_url && (<img src={board.pins[2]?.image_url} alt="Pin 3" />)}
                </div>
              </div>
            </div>
          </div>
          <h6 className="board-name">{board.board_name}</h6>
        </div>
      ))}
      <div className="create-board-container">
        <input
          type="text"
          placeholder="Enter board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          className="board-input"
        />
        <button className="create-board-button" onClick={handleCreateBoard}>
          Create
        </button>
      </div>
    </div>
  );
};

export default BoxLayout;
