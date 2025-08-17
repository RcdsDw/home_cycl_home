import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TableInterventions from "./table";
import * as interventionsAPI from "../../actions/interventions";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../actions/interventions");

const fakeInterventions = [
  {
    "@id": "/api/interventions/1",
    start_date: "2025-08-08T10:00:00",
    end_date: "2025-08-08T12:00:00",
    clientBike: {
      id: 1,
      owner: { id: 10, firstname: "Alice", lastname: "Doe" },
    },
    typeIntervention: { name: "Réparation", price: 50, duration: 3600 },
    technician: { id: 5, firstname: "Bob", lastname: "Tech" },
  },
];

describe("TableInterventions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    interventionsAPI.getInterventions.mockResolvedValue({
      member: fakeInterventions,
    });
    interventionsAPI.deleteIntervention.mockResolvedValue({});
  });

  it("affiche les interventions après fetch", async () => {
    render(
      <MemoryRouter>
        <TableInterventions />
      </MemoryRouter>,
    );

    expect(interventionsAPI.getInterventions).toHaveBeenCalled();

    expect(await screen.findByText("Réparation")).toBeInTheDocument();
    expect(await screen.findByText("Bob Tech")).toBeInTheDocument();
    expect(await screen.findByText("Alice Doe")).toBeInTheDocument();
  });

  it("ouvre la modal quand on clique sur supprimer", async () => {
    render(
      <MemoryRouter>
        <TableInterventions />
      </MemoryRouter>,
    );

    await screen.findByText("Réparation");

    const deleteButton = screen.getByRole("button", {
      name: /supprimer intervention/i,
    });

    fireEvent.click(deleteButton);

    await screen.findByText(/Supprimer définitivement/i);
  });

  it("supprime une intervention après confirmation", async () => {
    render(
      <MemoryRouter>
        <TableInterventions />
      </MemoryRouter>,
    );

    await screen.findByText("Réparation");

    const deleteButton = screen.getByRole("button", {
      name: /supprimer intervention/i,
    });
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId("confirm-delete");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(interventionsAPI.deleteIntervention).toHaveBeenCalledWith("1");
    });

    await waitFor(() => {
      expect(screen.queryByText(/Supprimer définitivement/i)).not.toBeVisible();
    });
  });

  it("gère les erreurs de chargement", async () => {
    interventionsAPI.getInterventions.mockRejectedValue(
      new Error("Erreur réseau"),
    );

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <TableInterventions />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/Aucune intervention trouvée/i),
    ).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
