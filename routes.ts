import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertGovernmentActivitySchema,
  insertCitizenIssueSchema,
  insertOfficialSchema,
  insertVoteRecordSchema,
  insertStatisticSchema,
  insertActionPlanSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Government Activities Routes
  app.get("/api/government-activities", async (_req, res) => {
    try {
      const activities = await storage.getAllGovernmentActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch government activities" });
    }
  });

  app.get("/api/government-activities/:id", async (req, res) => {
    try {
      const activity = await storage.getGovernmentActivity(req.params.id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity" });
    }
  });

  app.post("/api/government-activities", async (req, res) => {
    try {
      const validated = insertGovernmentActivitySchema.parse(req.body);
      const activity = await storage.createGovernmentActivity(validated);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });

  // Citizen Issues Routes
  app.get("/api/citizen-issues", async (_req, res) => {
    try {
      const issues = await storage.getAllCitizenIssues();
      res.json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch citizen issues" });
    }
  });

  app.get("/api/citizen-issues/:id", async (req, res) => {
    try {
      const issue = await storage.getCitizenIssue(req.params.id);
      if (!issue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      res.json(issue);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issue" });
    }
  });

  app.post("/api/citizen-issues", async (req, res) => {
    try {
      const validated = insertCitizenIssueSchema.parse(req.body);
      const issue = await storage.createCitizenIssue(validated);
      res.status(201).json(issue);
    } catch (error) {
      res.status(400).json({ error: "Invalid issue data" });
    }
  });

  app.patch("/api/citizen-issues/:id", async (req, res) => {
    try {
      const updated = await storage.updateCitizenIssue(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Issue not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Failed to update issue" });
    }
  });

  // Officials Routes
  app.get("/api/officials", async (_req, res) => {
    try {
      const officials = await storage.getAllOfficials();
      res.json(officials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch officials" });
    }
  });

  app.get("/api/officials/:id", async (req, res) => {
    try {
      const official = await storage.getOfficial(req.params.id);
      if (!official) {
        return res.status(404).json({ error: "Official not found" });
      }
      res.json(official);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch official" });
    }
  });

  app.post("/api/officials", async (req, res) => {
    try {
      const validated = insertOfficialSchema.parse(req.body);
      const official = await storage.createOfficial(validated);
      res.status(201).json(official);
    } catch (error) {
      res.status(400).json({ error: "Invalid official data" });
    }
  });

  // Vote Records Routes
  app.get("/api/vote-records", async (_req, res) => {
    try {
      const records = await storage.getAllVoteRecords();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vote records" });
    }
  });

  app.get("/api/vote-records/official/:officialId", async (req, res) => {
    try {
      const records = await storage.getVoteRecordsByOfficial(req.params.officialId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vote records" });
    }
  });

  app.post("/api/vote-records", async (req, res) => {
    try {
      const validated = insertVoteRecordSchema.parse(req.body);
      const record = await storage.createVoteRecord(validated);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: "Invalid vote record data" });
    }
  });

  // Statistics Routes
  app.get("/api/statistics", async (_req, res) => {
    try {
      const statistics = await storage.getAllStatistics();
      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  app.get("/api/statistics/:area", async (req, res) => {
    try {
      const stat = await storage.getStatisticByArea(req.params.area);
      if (!stat) {
        return res.status(404).json({ error: "Statistics not found for this area" });
      }
      res.json(stat);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  app.post("/api/statistics", async (req, res) => {
    try {
      const validated = insertStatisticSchema.parse(req.body);
      const stat = await storage.createStatistic(validated);
      res.status(201).json(stat);
    } catch (error) {
      res.status(400).json({ error: "Invalid statistics data" });
    }
  });

  // Action Plans Routes
  app.get("/api/action-plans", async (_req, res) => {
    try {
      const plans = await storage.getAllActionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch action plans" });
    }
  });

  app.get("/api/action-plans/:id", async (req, res) => {
    try {
      const plan = await storage.getActionPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Action plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch action plan" });
    }
  });

  app.post("/api/action-plans", async (req, res) => {
    try {
      const validated = insertActionPlanSchema.parse(req.body);
      const plan = await storage.createActionPlan(validated);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: "Invalid action plan data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
