import { dateFormatter } from "../utils/dateFormatter"

const ColumnCard = (props) => {
    const { colData } = props  
    const {field_photo_image_section, title, last_update} = colData?.node
    const outputDate = dateFormatter(last_update);

    const timeStampStyles = {
        color: 'grey',
      };

    return(
      <div className='col-card'>
        <img className='col-img' alt='col-logo' src={field_photo_image_section} />
        <div>
        <h4 className="text-container">{title}</h4>
        <h4 style={timeStampStyles}>{outputDate}</h4>
        </div>
      </div>
    )
  }

  export default ColumnCard;