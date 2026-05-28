import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import IncidentCard from "../../components/incidents/IncidentCard";

import {
  getAllIncidents,
  getOpenIncidents,
} from "../../services/incidentService";

function IncidentsPage() {

  const [incidents, setIncidents] =
    useState([]);

  const [openIncidents, setOpenIncidents] =
    useState([]);

  const [previousOpenCount, setPreviousOpenCount] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
   * FETCH INCIDENTS
   */

  const fetchIncidents = async () => {

    try {

      const [
        allData,
        openData
      ] = await Promise.all([
        getAllIncidents(),
        getOpenIncidents(),
      ]);

      setIncidents(allData);

      setOpenIncidents(openData);

      /*
       * PREVENT ALERTS
       * ON FIRST LOAD
       */

      if (previousOpenCount !== null) {

        /*
         * NEW INCIDENT CREATED
         */

        if (
          openData.length >
          previousOpenCount
        ) {

          const latestIncident =
            openData[0];

          if (latestIncident) {

            toast.error(
              `🚨 ${latestIncident.monitorName} is DOWN`
            );
          }
        }

        /*
         * INCIDENT RESOLVED
         */

        if (
          openData.length <
          previousOpenCount
        ) {

          toast.success(
            "✅ Monitor recovered successfully"
          );
        }
      }

      /*
       * UPDATE COUNT
       */

      setPreviousOpenCount(
        openData.length
      );

    } catch (error) {

      console.error(
        "Failed to fetch incidents",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /*
   * AUTO REFRESH
   */

  useEffect(() => {

    fetchIncidents();

    const interval =
      setInterval(
        fetchIncidents,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <MainLayout>

      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-8
        "
      >

        {/* HERO */}

        <div className="mb-10">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#22c55e]
              font-semibold
              mb-3
            "
          >
            INCIDENT CENTER
          </p>

          <h1
            className="
              text-5xl
              md:text-6xl
              font-black
              tracking-tight
              text-white
              mb-4
            "
          >
            Incident Timeline
          </h1>

          <p
            className="
              text-neutral-400
              text-lg
              max-w-3xl
              leading-8
            "
          >
            Track outages, downtime,
            active incidents, and
            infrastructure failures
            across all monitors in
            real time.
          </p>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            mb-10
          "
        >

          {/* TOTAL */}

          <div
            className="
              bg-[#0d0d0d]
              border
              border-white/5
              rounded-3xl
              p-6
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-neutral-500
                mb-3
              "
            >
              Total Incidents
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-white
              "
            >
              {incidents.length}
            </h2>

          </div>

          {/* ACTIVE */}

          <div
            className="
              bg-[#0d0d0d]
              border
              border-red-500/10
              rounded-3xl
              p-6
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-neutral-500
                mb-3
              "
            >
              Active Incidents
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-red-400
              "
            >
              {openIncidents.length}
            </h2>

          </div>

          {/* RESOLVED */}

          <div
            className="
              bg-[#0d0d0d]
              border
              border-green-500/10
              rounded-3xl
              p-6
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-neutral-500
                mb-3
              "
            >
              Resolved
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-green-400
              "
            >
              {
                incidents.length
                -
                openIncidents.length
              }
            </h2>

          </div>

        </div>

        {/* INCIDENTS */}

        {
          loading ? (

            <div
              className="
                bg-[#0d0d0d]
                border
                border-white/5
                rounded-3xl
                p-10
                text-center
                text-neutral-400
              "
            >
              Loading incidents...
            </div>

          ) : incidents.length === 0 ? (

            <div
              className="
                bg-[#0d0d0d]
                border
                border-white/5
                rounded-3xl
                p-10
                text-center
                text-neutral-400
              "
            >
              No incidents found.
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
              "
            >

              {
                incidents.map(
                  (incident) => (
                    <IncidentCard
                      key={incident.id}
                      incident={incident}
                    />
                  )
                )
              }

            </div>

          )
        }

      </div>

    </MainLayout>
  );
}

export default IncidentsPage;