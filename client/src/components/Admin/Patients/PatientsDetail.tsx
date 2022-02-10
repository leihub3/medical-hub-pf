import { useState, useEffect } from "react";
import style from "./PatientsDetail.module.css";
import { getPatientDetails, updatePatient, getPlans, updatePermissions, resetPassword } from "../requests";
import { FiEdit } from "react-icons/fi";

export default function MedicsDetail(props: any): JSX.Element {
  const getDetails = async (id: number) => {
    try {
      const response: any = await getPatientDetails(id);
      setPatient({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
        dni: response.data.dni,
        createdAt: response.data.createdAt,
        PlanId: response.data.PlanId
      });
      let planes = await getPlans()
      if(planes) {
        setPlans(planes.data)
        let plan = planes.data!.find((p: any) => p.id == response.data.PlanId)
        if (plan) setSelectedPlan(plan.name)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [ errors, setErrors ] = useState<any>();
  const [ plans, setPlans] = useState<any[]>()
  const [ editable, setEditable] = useState("");
  const [ patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    createdAt: "",
    PlanId: 1
  });
  const [ selectedPlan, setSelectedPlan ] = useState("")

  function validate(input: any) {
    let errors: any = {};
    if (!input.firstName) {
      errors.firstName = 'empty';
    } else if (!/^[A-Za-z\s]+$/.test(input.firstName)) {
      errors.firstName = 'error';
    }
    if (!input.lastName) {
      errors.lastName = 'empty';
    } else if (!/^[A-Za-z\s]+$/.test(input.lastName)) {
      errors.lastName = 'error';
    }
    if (!input.phone) {
      errors.phone = 'empty';
    } else if (!(parseInt(input.phone) > 100000)) {
      errors.phone = 'error';
    }
    if (!input.dni) {
      errors.dni = 'empty';
    } else if (!(parseInt(input.dni) > 1000000)) {
      errors.dni = 'error';
    }
    return errors;
  };

  function getSelectedPlan (id: number) {
    let plan = plans!.find((p: any) => p.id == id)
    console.log("plan")
    if (plan) setSelectedPlan(plan.name)
  }

  function handleInputChange(e: any) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "PlanId") {
      getSelectedPlan(e.target.value)
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  async function acceptChanges(e: any) {
    e.preventDefault();
    let errors = validate(patient)
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      setErrors(errors)
    } else {
      await updatePatient(props.id, patient);
      props.reolad();
    }
  }

  async function revokeAccess (e: any) {
    e.preventDefault();
    await updatePermissions(props.id, { active: false });
    props.reolad();
  }

  async function makeAdmin (e:any) {
    e.preventDefault();
    await updatePermissions(props.id, { isAdmin: true });
    props.reolad();
  }

  async function forcePassword (e:any) {
    e.preventDefault();
    await resetPassword(props.id, { resetPass: true });
    props.reolad();
  }

  useEffect(() => {
    getDetails(props.id)
  }, []);

  return (
    <div className={style.formContainer}>
      <h2>Details</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <label htmlFor="firstName">First Name</label>
          {editable === "firstName" ? (
            <>
              <input
                type="text"
                name="firstName"
                value={patient.firstName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.firstName}</span>
              <button
                onClick={() => setEditable("firstName")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          {editable === "lastName" ? (
            <>
              <input
                type="text"
                name="lastName"
                value={patient.lastName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.lastName}</span>
              <button
                onClick={() => setEditable("lastName")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          {editable === "phone" ? (
            <>
              <input
                type="text"
                name="phone"
                value={patient.phone}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.phone}</span>
              <button
                onClick={() => setEditable("phone")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          {editable === "dni" ? (
            <>
              <input
                type="text"
                name="dni"
                value={patient.dni}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.dni}</span>
              <button
                onClick={() => setEditable("dni")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="PlanId">Plan</label>
          {editable === "PlanId" ? (
            <>
              <select
                name="PlanId"
                onChange={handleInputChange}>
                {plans? plans.map((p: any) => <option value={p.id}>{p.name}</option>) : null}
              </select>
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{selectedPlan}</span>
              <button
                onClick={() => setEditable("PlanId")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label>Created at</label>
          <span>{patient.createdAt}</span>
        </div>
      </form>
      <div className={style.endBtn}>
        <button onClick={forcePassword} className={style.btnEdit}>Reset Password</button>
        <button onClick={revokeAccess} className={style.btnEdit}>Revoke Access</button>
        <button onClick={makeAdmin} className={style.btnEdit}>Make Admin</button>
        <button onClick={acceptChanges} className={style.btnEdit}>
          Accept changes
        </button>
        <button onClick={() => props.return()} className={style.btnEdit}>
          Go back
        </button>
      </div>
      {errors? "Invalid input" : null}
    </div>
  );
}
