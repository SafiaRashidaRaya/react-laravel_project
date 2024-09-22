import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Task/TaskTable";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination";

export default function Show({
  auth,
  project,
  tasks,
  success,
  queryParams,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete the task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Project "${project.name}"`}
          </h2>
          {/* {project.createdBy &&
            (project.createdBy.name === auth.user.name ||
              auth.user.id === 1) && (
              <Link
                href={route("project.edit", project.id)}
                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
              >
                Edit
              </Link>
            )} */}
          <div className="flex">
            {project.createdBy ? (
              project.createdBy.name === auth.user.name ||
              auth.user.id === 1 ? (
                <>
                  <Link
                    href={route("project.edit", project.id)}
                    className="bg-emerald-500 py-1 px-3 mr-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Edit
                  </Link>
                  {/* <button
                    onClick={(e) => deleteProject(project)}
                    className="bg-red-500 py-1 px-1 text-white rounded shadow transition-all hover:bg-red-600"
                  >
                    Delete
                  </button> */}
                </>
              ) : (
                <Link className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600">
                  Actions Unavailable
                </Link>
              )
            ) : auth.user.id === 1 ? (
              <>
                <Link
                  href={route("project.edit", project.id)}
                  className="bg-emerald-500 py-1 px-3 mr-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  Edit
                </Link>
                {/* <button
                  onClick={(e) => deleteProject(project)}
                  className="bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-600"
                >
                  Delete
                </button> */}
              </>
            ) : (
              <Link className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600">
                Actions Unavailable
              </Link>
            )}
          </div>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {/* <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div> */}
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Project ID</label>
                    <p className="mt-1">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Name</label>
                    <p className="mt-1">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">
                      {project.createdBy
                        ? project.createdBy.name
                        : "The user has been deleted"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">
                      {project.updatedBy
                        ? project.updatedBy.name
                        : "The user has been deleted"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Project Description</label>
                <p className="mt-1">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideProjectColumn={true}
                success={success}
              /> */}
              <>
                {success && (
                  <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                  </div>
                )}
                <div className="overflow-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <TableHeading
                          name="id"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          ID
                        </TableHeading>
                        <th className="px-3 py-3 ">Image</th>
                        {!hideProjectColumn && (
                          <th className="px-3 py-3 ">Project Name</th>
                        )}
                        {/*Don't erase this one (The image one)*/}
                        <TableHeading
                          name="name"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Name
                        </TableHeading>
                        <TableHeading
                          name="status"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Status
                        </TableHeading>
                        <TableHeading
                          name="created_at"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Create Date
                        </TableHeading>
                        <TableHeading
                          name="due_date"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Due Date
                        </TableHeading>
                        <th className="px-3 py-3">Created By</th>
                        <th className="px-3 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    {/* Below is the search bar/filter */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        {!hideProjectColumn && <th className="px-3 py-3"></th>}
                        <th className="px-3 py-3">
                          <TextInput
                            className="w-full"
                            defaultValue={queryParams.name}
                            placeholder="Task Name"
                            onBlur={(e) =>
                              searchFieldChanged("name", e.target.value)
                            }
                            onKeyPress={(e) => onKeyPress("name", e)}
                          />
                        </th>
                        <th className="px-3 py-3">
                          <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                              searchFieldChanged("status", e.target.value)
                            }
                          >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </SelectInput>
                        </th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                      </tr>
                    </thead>
                    {/* Below is the table */}
                    <tbody>
                      {tasks.data.map((task) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={task.id}
                        >
                          <td className="px-3 py-2">{task.id}</td>
                          <td className="px-3 py-2">
                            <img src={task.image_path} style={{ width: 60 }} />
                          </td>
                          {!hideProjectColumn && (
                            <td className="px-3 py-2">{task.project.name}</td>
                          )}
                          <td className="px-3 py-2 text-gray-100 hover:underline">
                            <Link href={route("task.show", task.id)}>
                              {task.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={
                                "px-2 py-1 rounded text-white " +
                                TASK_STATUS_CLASS_MAP[task.status]
                              }
                            >
                              {TASK_STATUS_TEXT_MAP[task.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {task.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {task.due_date}
                          </td>
                          <td className="px-3 py-2">
                            {task.createdBy
                              ? task.createdBy.name
                              : "User has been deleted"}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {task.createdBy ? (
                              task.createdBy.name === auth.user.name ||
                              task.assignedUser.name === auth.user.name ||
                              auth.user.id === 1 ? (
                                <>
                                  <td className="px-3 py-2 text-nowrap">
                                    <Link
                                      href={route("task.edit", task.id)}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                      Edit
                                    </Link>
                                    <button
                                      onClick={(e) => deleteTask(task)}
                                      className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <span>Actions Unavailable</span>
                              )
                            ) : auth.user.id === 1 ? (
                              <>
                                <td className="px-3 py-2 text-nowrap">
                                  <Link
                                    href={route("task.edit", task.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={(e) => deleteTask(task)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </>
                            ) : (
                              <span>Actions Unavailable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination links={tasks.meta.links} />
              </>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
