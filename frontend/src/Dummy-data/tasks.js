const tasks = [
  {
    title: "Do something",
    id: 1,
    description: "Something to do",
    dueDate: "tomorrow",
    priority: "P1",
    label: "idle",
    subTasks: [
      {
        title: "Do another thing",
        id: 1,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        dueDate: "sampleDueDate",
      },
      {
        title: "Do one more thing",
        id: 2,
        description: "",
        dueDate: "",
      },
    ],
  },
  {
    id: 2,
    title: "Build task",
    description: "Build task app",
    dueDate: "next monday",
    priority: "P3",
    label: "coding",
    subTasks: [
      {
        title: "sample sub task",
        id: 1,
        description: "sample subtask description",
        dueDate: "sampleDueDate",
      },
    ],
  },
  {
    id: 4,
    title: "Check Component",
    description: "check components for erros",
    dueDate: "today",
    priority: "P1",
    label: "",
    subTasks: [
      {
        title: "sample sub task",
        id: 1,
        description: "sample subtask description",
        dueDate: "sampleDueDate",
      },
    ],
  },
  {
    id: 5,
    title: "Lorem ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    dueDate: "today",
    priority: "P1",
    label: "",
    subTasks: [
      {
        title: "sample sub task",
        id: 1,
        description: "sample subtask description",
        dueDate: "sampleDueDate",
      },
    ],
  },
  {
    title: "Do something",
    id: 6,
    description: "",
    dueDate: "",
    priority: "P5",
    label: "",
    subTasks: [{}],
  },
];

export default tasks;
