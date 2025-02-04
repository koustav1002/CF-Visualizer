import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContestRatingGraph = ({ userContests, maxRating }) => {
  let pointBackgroundColors = [];
  const data = {
    labels: [],
    datasets: [
      {
        label: "Rating",
        data: [],
        // fill: false,
        backgroundColor: ["rgb(28, 109, 208, 0.9)"],
        borderColor: ["rgb(28, 109, 208, 0.4)"],
        pointBackgroundColor: pointBackgroundColors,
      },
    ],
  };

  for (let i = 0; i < userContests.length; i++) {
    let dateSeconds = userContests[i].ratingUpdateTimeSeconds;
    let rating = userContests[i].newRating;
    let date = new Date(null);
    date.setTime(dateSeconds * 1000);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    let date_mmmddyyyy = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    data.datasets[0].data.push(rating);
    data.labels.push(date_mmmddyyyy);
  }

  for (let i = 0; i < data.datasets[0].data.length; i++) {
    if (data.datasets[0].data[i] === maxRating) {
      pointBackgroundColors.push("red");
    } else {
      pointBackgroundColors.push("rgb(28, 109, 208, 0.9)");
    }
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Contest Rating",
      },
      legend: {
        display: false,
      },
    },
    // responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Line data={data} options={options} height={400} />
    </div>
  );
};

export default ContestRatingGraph;
