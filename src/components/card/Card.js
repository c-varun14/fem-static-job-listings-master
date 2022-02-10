import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import { jobsAction } from "../../store/jobsSlice";

const Card = (props) => {
  const job = props.job;
  const special = job.featured ? styles.special : "";
  const dispatch = useDispatch();

  const onClickHandler = (value) => {
    dispatch(jobsAction.addFilter(value));
  };

  return (
    <div className={`${styles.card} ${special}`}>
      <div className={styles.imgDiv}>
        <img className={styles.image} src={props.image} alt="LOGO" />
      </div>
      <div className={styles.upperPortion}>
        <div className={styles.identity}>
          <span className={styles.company}>{job.company}</span>
          {job.new && <span className={styles.new}>NEW!</span>}
          {job.featured && <span className={styles.featured}>FEATURED</span>}
        </div>

        <span className={styles.position}>{job.position}</span>
        <ul>
          <li>{job.postedAt}</li>
          <li className={styles.dot}>{job.contract}</li>
          <li className={styles.dot}>{job.location}</li>
        </ul>
      </div>
      <div className={`${styles.lowerPortion} filtersParent`}>
        <div
          onClick={() => onClickHandler({ type: "role", value: job.role })}
          className={`${styles.filters} filters`}
        >
          {job.role}
        </div>
        <div
          className={`${styles.filters} filters`}
          onClick={() => onClickHandler({ type: "level", value: job.level })}
        >
          {job.level}
        </div>
        {job.languages.length !== 0 &&
          job.languages.map((item, id) => (
            <div
              className={`${styles.filters} filters`}
              onClick={() => onClickHandler({ type: "languages", value: item })}
              key={id}
            >
              {item}
            </div>
          ))}
        {job.tools.length !== 0 &&
          job.tools.map((item, id) => (
            <div
              className={`${styles.filters} filters`}
              onClick={() => onClickHandler({ type: "tools", value: item })}
              key={id + job.languages.length}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
