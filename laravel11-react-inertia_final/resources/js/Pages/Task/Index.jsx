import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";

export default function Index({
  auth,
  tasks,
  success,
  queryParams = null,
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
            Tasks
          </h2>

          <Link
            href={route("task.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      {/* <th className="px-3 py-3">Image</th> */}
                      {!hideProjectColumn && (
                        <th className="px-3 py-3">Project Name</th>
                      )}
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
                  <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      {/* <th className="px-3 py-3"></th> */}
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
                  <tbody>
                    {tasks.data.map((task) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={task.id}
                      >
                        <td className="px-3 py-2">{task.id}</td>
                        {/* <td className="px-3 py-2">
                                    <img
                                        src={task.image_path}
                                        style={{ width: 60 }}
                                    />
                                </td> */}
                        {!hideProjectColumn && (
                          <td className="px-3 py-2">{task.project.name}</td>
                        )}
                        <th className="px-3 py-2 text-gray-100 hover:underline">
                          <Link href={route("task.show", task.id)}>
                            {task.name}
                          </Link>
                        </th>
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
                        <td className="px-3 py-2">{task.created_at}</td>
                        <td className="px-3 py-2">{task.due_date}</td>
                        <td className="px-3 py-2">
                          {task.createdBy
                            ? task.createdBy.name
                            : "User has been deleted"}
                        </td>
                        {/* {task.createdBy &&
                          (task.createdBy.name === auth.user.name ||
                            task.assignedUser.name === auth.user.name ||
                            auth.user.id === 1) && (
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
                          )} */}

                        {/* {task.createdBy ? (
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
                            <p className="mt-2">Actions Unavailable</p>
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
                          <p className="mt-2">Actions Unavailable</p>
                        )} */}
                        {task.createdBy ? (
                          task.createdBy.name === auth.user.name ||
                          auth.user.id === 1 ? (
                            // If the current user is the creator or user with ID 1, show both Edit and Delete buttons
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
                          ) : task.assignedUser.name === auth.user.name ? (
                            // If the current user is the assigned user, show only the Edit button
                            <td className="px-3 py-2 text-nowrap">
                              <Link
                                href={route("task.edit", task.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              >
                                Edit
                              </Link>
                            </td>
                          ) : (
                            // If the user is neither the creator, assigned user, nor user with ID 1, show "Actions Unavailable"
                            <td className="px-3 py-2 text-nowrap">
                              <p className="mt-2">Actions Unavailable</p>
                            </td>
                          )
                        ) : auth.user.id === 1 ? (
                          // If task does not have a creator, but the current user has ID 1, show both Edit and Delete buttons
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
                        ) : (
                          // For all other users, show "Actions Unavailable"
                          <td className="px-3 py-2 text-nowrap">
                            <p className="mt-2">Actions Unavailable</p>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={tasks.meta.links} />
              </div>
            </div>
          </div>
        </div>
    </AuthenticatedLayout>
  );
}
