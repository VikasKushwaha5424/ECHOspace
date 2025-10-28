import React from 'react';

// This is a reusable modal component.
// It takes 'show' (boolean) and 'onClose' (function) as props.
const TermsModal = ({ show, onClose }) => {
  if (!show) {
    return null; // Don't render anything if 'show' is false
  }

  return (
    // The 'modal-overlay' class will be styled in your new style.scss
    // Clicking the overlay will close the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* This stops a click inside the modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Terms and Conditions</h2>
        <div className="modal-content">
          <p>
            <b>The "Terms and Conditions" (The Not-Boring Version)</b><br/>
            Hey there! Welcome to ECHOspace.<br/>
            By using this app, you're basically giving us a digital high-five and agreeing to these simple rules. If you don't agree, no hard feelings, but you'll have to show yourself the digital door.
            <br/><br/>
            <b>1. The "Be Cool" Rule (A.K.A. Don't Be a Jerk)</b><br/>
            This is the most important one. We built this for fun.
            <ul>
              <li><b>No Trolls Allowed:</b> Don't bully, harass, or be mean to other users.</li>
              <li><b>Keep it Legal:</b> Don't use this app to do crimes. Seriously. No sharing illegal stuff, planning heists, or running weird scams.</li>
              <li><b>No Spam, Please!</b> Don't be that person. Nobody likes spam. This isn't the place to sell your cousin's miracle diet pills.</li>
              <li><b>Don't Break Our Toys:</b> Don't try to hack, reverse-engineer, or blow up our servers. We're trying our best here.</li>
            </ul>
            <br/>
            <b>2. Your Stuff is Your Stuff (Mostly)</b><br/>
            What you type is on you. We're not responsible for that embarrassing typo you sent to your crush or that terrible joke that didn't land.
            We don't "own" your chats, but our app has to, you know, send them. So you give us permission to transmit and store your messages so other people can see them. That's... kind of the whole point of a chat app.
            <br/><br/>
            <b>3. The "We Can Kick You Out" Clause</b><br/>
            If you break the "Be Cool" rule, we can and will hit the big, red BAN button. We can delete your account, block your IP, and tell all the other servers what a meanie you were. (Okay, maybe not that last one). We don'n't even need a good reason. Poof! Gone.
            <br/><br/>
            <b>4. The "This is a Project" Clause (A.K.A. The "It's Not Our Fault" Bit)</b><br/>
            We built this with duct tape and dreams. It's provided "AS IS."
            This means the app might crash. It might be buggy. A message might get lost in the digital void. We are not liable if you lose an important message, your chat history vanishes, or the app accidentally orders 50 pizzas to your house (that's probably not possible, but you get the idea).
            USE AT YOUR OWN RISK!
            <br/><br/>
            <b>5. These Rules Can Change</b><br/>
            We might update these rules whenever we want, especially if we add new, wacky features. We'll try to let you know, but just check back here if you're ever really bored.
            <br/><br/>
            By clicking "I Agree," you're promising you read this (or at least scrolled to the bottom) and you're cool with it.
            <br/><br/>
            Now go have fun!
          </p>
        </div>
        {/* The 'close-btn' class will be styled in your new style.scss */}
        <button className="close-btn" onClick={onClose}>
          Got It!
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
