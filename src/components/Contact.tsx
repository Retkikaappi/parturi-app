const Contact = () => {
  return (
    <div className='p-4 flex justify-center'>
      <div className='m-4 p-4'>
        <h2 className=' text-xl font-semibold'>Obon parturi-kampaamo</h2>
        <div className='m-4 text-start'>
          <h4>Contact information:</h4>
          <p>Phone: 050 1234 321</p>
          <p>Address: Toontown, 12345, Funkyroad 123</p>
        </div>
      </div>
      <div className='w-1/3'>
        <iframe
          width='100%'
          height='600'
          src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Alaj%C3%A4rvi,%20Keskuskatu%201+(Obon-Parturikampaamo)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
        >
          <a href='https://www.gps.ie/'>gps vehicle tracker</a>
        </iframe>
      </div>
    </div>
  );
};

export default Contact;
