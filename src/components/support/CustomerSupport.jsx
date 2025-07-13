"use client";

import getAllTickets from "../../api/support/GetAllTicket";
import { useEffect, useState } from "react";
import updateTicket from "../../api/support/UpdateTicket";

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("all");

  const getTickets = async () => {
    const response = await getAllTickets();
    setTickets(response.data);
  };

  const chgStatusTicket = async (id, data) => {
    const response = await updateTicket({ id, data });
    console.log(response);
    if (response.code === 200) {
      getTickets();
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "unseen") return !ticket.hasSeen;
    if (filter === "solved") return ticket.hasSolved;
    if (filter === "unsolved") return !ticket.hasSolved;
    return true;
  });

  const getStatusBadge = (ticket) => {
    if (ticket.hasSolved) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Solved
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        Pending
      </span>
    );
  };

  return (
    <div className="">
      {/* Header */}

      <div className="w-full px-4">
        <div className="flex justify-between items-center">
          <h1 className="header">Customer Mailbox</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {filteredTickets.length} tickets
            </span>
          </div>
        </div>
      </div>

      <div className="w-full py-6 px-4">
        {/* Tab Bar Filters */}
        <div className="">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setFilter("all")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  filter === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Tickets
                <span
                  className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    filter === "all"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {tickets.length}
                </span>
              </button>
              <button
                onClick={() => setFilter("unseen")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  filter === "unseen"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Unseen
                <span
                  className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    filter === "unseen"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {tickets.filter((t) => !t.hasSeen).length}
                </span>
              </button>
              <button
                onClick={() => setFilter("unsolved")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  filter === "unsolved"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending
                <span
                  className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    filter === "unsolved"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {tickets.filter((t) => !t.hasSolved).length}
                </span>
              </button>
              <button
                onClick={() => setFilter("solved")}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  filter === "solved"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Solved
                <span
                  className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    filter === "solved"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {tickets.filter((t) => t.hasSolved).length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Ticket List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-y-auto h-[calc(100vh-250px)]">
          <div className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <p>No tickets found for the selected filter.</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !ticket.hasSeen ? "bg-blue-50 " : ""
                  } ${selectedTicket?._id === ticket._id ? "bg-blue-100" : ""}`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex flex-col md:flex-row items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {ticket.customerName}
                          </span>
                        </h3>
                        {!ticket.hasSeen && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                        {getStatusBadge(ticket)}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {ticket.additionalNote}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            chgStatusTicket(ticket._id, { hasSolved: true });
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Mark as Solved
                        </button>
                        <button
                          onClick={() => {
                            window.open(
                              `https://app.manychat.com/fb104552281496385/chat/${ticket.ticketId}`
                            );
                            chgStatusTicket(ticket._id, { hasSeen: true });
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {/* {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Ticket #{selectedTicket.ticketId}
                </h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {getStatusBadge(selectedTicket)}
                  {!selectedTicket.hasSeen && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Unread
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Customer:</span>
                    <p className="text-gray-900">
                      {selectedTicket.customerName}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <p className="text-gray-900">
                      {formatDate(selectedTicket.createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-700">
                    Additional Note:
                  </span>
                  <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-md">
                    {selectedTicket.additionalNote}
                  </p>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CustomerSupport;
