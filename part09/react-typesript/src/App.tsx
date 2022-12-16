const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourtPartBaseDescription extends CoursePartBase{
    description: string;
  }

  interface CourseNormalPart extends CourtPartBaseDescription {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourtPartBaseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CourtPartBaseDescription {
    type: "special";
    requirements: Array<string>;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  const Header = ({courseName}: {courseName : string}) => {
    return(
      <h1>{courseName}</h1>
    )
  }

  const Part = ({part} : {part: CoursePart}) => {
    switch (part.type){
      case "normal":
        return(
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
            {part.description}
          </p>
        );
      case "groupProject":
        return(
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
            project exercises {part.groupProjectCount}
          </p>
          
        );
      case "submission":
        return(
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
            <i>{part.description}</i><br/>
            submit to {part.exerciseSubmissionLink}
          </p>
        );
      case "special":
        return(
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
            <i>{part.description}</i><br/>
            required skills: {part.requirements.toString().replace(/[[]"]/g,'/').split(',').join(', ')}
          </p>
        );

    }
  }
  const Content = ({courses} : {courses : Array<CoursePart>}) => {
    return(
      <div>
        {courses.map(course => <Part key={course.name} part={course}/>)}
      </div>
    )
  }

  const Total = ({courses} : {courses : Array<CoursePart>}) => {
    return(
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }
  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts}/>
    </div>
  );
};

export default App;