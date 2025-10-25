import { 
  type User, 
  type InsertUser,
  type GovernmentActivity,
  type InsertGovernmentActivity,
  type CitizenIssue,
  type InsertCitizenIssue,
  type Official,
  type InsertOfficial,
  type VoteRecord,
  type InsertVoteRecord,
  type Statistic,
  type InsertStatistic,
  type ActionPlan,
  type InsertActionPlan,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Government Activities
  getAllGovernmentActivities(): Promise<GovernmentActivity[]>;
  getGovernmentActivity(id: string): Promise<GovernmentActivity | undefined>;
  createGovernmentActivity(activity: InsertGovernmentActivity): Promise<GovernmentActivity>;
  
  // Citizen Issues
  getAllCitizenIssues(): Promise<CitizenIssue[]>;
  getCitizenIssue(id: string): Promise<CitizenIssue | undefined>;
  createCitizenIssue(issue: InsertCitizenIssue): Promise<CitizenIssue>;
  updateCitizenIssue(id: string, updates: Partial<CitizenIssue>): Promise<CitizenIssue | undefined>;
  
  // Officials
  getAllOfficials(): Promise<Official[]>;
  getOfficial(id: string): Promise<Official | undefined>;
  createOfficial(official: InsertOfficial): Promise<Official>;
  
  // Vote Records
  getAllVoteRecords(): Promise<VoteRecord[]>;
  getVoteRecordsByOfficial(officialId: string): Promise<VoteRecord[]>;
  createVoteRecord(record: InsertVoteRecord): Promise<VoteRecord>;
  
  // Statistics
  getAllStatistics(): Promise<Statistic[]>;
  getStatisticByArea(area: string): Promise<Statistic | undefined>;
  createStatistic(stat: InsertStatistic): Promise<Statistic>;
  
  // Action Plans
  getAllActionPlans(): Promise<ActionPlan[]>;
  getActionPlan(id: string): Promise<ActionPlan | undefined>;
  createActionPlan(plan: InsertActionPlan): Promise<ActionPlan>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private governmentActivities: Map<string, GovernmentActivity>;
  private citizenIssues: Map<string, CitizenIssue>;
  private officials: Map<string, Official>;
  private voteRecords: Map<string, VoteRecord>;
  private statistics: Map<string, Statistic>;
  private actionPlans: Map<string, ActionPlan>;

  constructor() {
    this.users = new Map();
    this.governmentActivities = new Map();
    this.citizenIssues = new Map();
    this.officials = new Map();
    this.voteRecords = new Map();
    this.statistics = new Map();
    this.actionPlans = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed Officials
    const official1 = this.createOfficialSync({
      name: "Sarah Johnson",
      role: "City Council Member",
      district: "District 5",
      party: "Democratic",
      phone: "(555) 123-4567",
      email: "sarah.johnson@citycouncil.gov",
      photoUrl: "",
      committees: ["Transportation Committee", "Public Safety Committee"],
    });

    const official2 = this.createOfficialSync({
      name: "Michael Chen",
      role: "State Senator",
      district: "District 11",
      party: "Democratic",
      phone: "(555) 234-5678",
      email: "michael.chen@senate.gov",
      photoUrl: "",
      committees: ["Health & Human Services", "Education"],
    });

    const official3 = this.createOfficialSync({
      name: "Emily Rodriguez",
      role: "Mayor",
      district: "",
      party: "Independent",
      phone: "(555) 345-6789",
      email: "mayor@city.gov",
      photoUrl: "",
      committees: ["Executive Office"],
    });

    // Seed Government Activities
    const activity1 = this.createGovernmentActivitySync({
      type: "bill",
      title: "Safe Streets Initiative - HB 2847",
      description: "Comprehensive bill to improve pedestrian safety through enhanced crosswalks, traffic calming measures, and increased penalties for reckless driving in residential areas.",
      category: "infrastructure",
      date: new Date("2025-11-15"),
      status: "in-progress",
      location: "State Capitol",
      agendaItems: null,
      voteResult: "pending",
    });

    const activity2 = this.createGovernmentActivitySync({
      type: "meeting",
      title: "City Council Public Health Committee Meeting",
      description: "Discussion on expanding access to healthy food options in underserved neighborhoods, including farmers market subsidies and grocery store incentives.",
      category: "health",
      date: new Date("2025-11-05"),
      status: "upcoming",
      location: "City Hall, Room 400",
      agendaItems: ["Farmers market expansion proposal", "Grocery store tax incentives", "Community health metrics review", "Public comment period"],
      voteResult: null,
    });

    const activity3 = this.createGovernmentActivitySync({
      type: "vote",
      title: "Public Safety Budget Allocation - Resolution 2024-089",
      description: "Vote on allocating $2.5M to community policing programs, mental health crisis response teams, and neighborhood watch support.",
      category: "safety",
      date: new Date("2025-10-20"),
      status: "completed",
      location: "City Council Chambers",
      agendaItems: null,
      voteResult: "passed",
    });

    this.createGovernmentActivitySync({
      type: "budget",
      title: "FY 2026 Education Budget Proposal",
      description: "Proposed $450M budget for public schools including teacher salary increases, facility upgrades, and expanded after-school programs.",
      category: "education",
      date: new Date("2025-12-01"),
      status: "upcoming",
      location: "School Board Office",
      agendaItems: ["Budget overview", "Revenue projections", "Expenditure breakdown", "Public input session"],
      voteResult: null,
    });

    this.createGovernmentActivitySync({
      type: "meeting",
      title: "Environmental Committee: Climate Action Plan",
      description: "Review and discussion of the city's 2025-2030 climate action plan, including renewable energy targets and emissions reduction strategies.",
      category: "environment",
      date: new Date("2025-11-12"),
      status: "upcoming",
      location: "Virtual Meeting",
      agendaItems: ["Renewable energy goals", "Public transit expansion", "Green building requirements", "Community feedback"],
      voteResult: null,
    });

    // Seed Citizen Issues
    const issue1 = this.createCitizenIssueSync({
      title: "Dangerous intersection at Main St and 5th Ave",
      description: "This intersection has had 3 accidents in the past month. There are no traffic lights and visibility is poor. We need a stop light or at least stop signs on all corners.",
      category: "infrastructure",
      location: "Downtown District",
      zipcode: "94102",
    });

    // Match issue1 to activity1
    issue1.votes = 127;
    issue1.matchedActivityId = activity1.id;
    issue1.status = "matched";
    this.citizenIssues.set(issue1.id, issue1);

    const issue2 = this.createCitizenIssueSync({
      title: "No grocery stores within walking distance",
      description: "Our neighborhood doesn't have a single grocery store selling fresh produce. The nearest one is 2 miles away, making it difficult for elderly residents and those without cars to access healthy food.",
      category: "health",
      location: "Sunset District",
      zipcode: "94103",
    });
    issue2.votes = 89;
    issue2.matchedActivityId = activity2.id;
    issue2.status = "matched";
    this.citizenIssues.set(issue2.id, issue2);

    this.createCitizenIssueSync({
      title: "Inadequate street lighting in residential area",
      description: "Our street has very poor lighting at night, creating safety concerns. Several residents have reported feeling unsafe walking home after dark.",
      category: "safety",
      location: "Mission District",
      zipcode: "94110",
    }).votes = 56;

    this.createCitizenIssueSync({
      title: "Overcrowded elementary school classrooms",
      description: "The local elementary school has class sizes of 35+ students, making it difficult for teachers to provide individual attention. We need more funding for additional classrooms and teachers.",
      category: "education",
      location: "Richmond District",
      zipcode: "94102",
    }).votes = 72;

    this.createCitizenIssueSync({
      title: "Park needs better maintenance and playground equipment",
      description: "Lincoln Park hasn't been properly maintained. The playground equipment is rusty and potentially dangerous, and the grass areas are overgrown.",
      category: "environment",
      location: "Lincoln Park",
      zipcode: "94103",
    }).votes = 43;

    // Seed Vote Records
    this.createVoteRecordSync({
      officialId: official1.id,
      activityId: activity3.id,
      vote: "yes",
      issue: "Public Safety Budget Allocation",
      date: new Date("2025-10-20"),
    });

    this.createVoteRecordSync({
      officialId: official2.id,
      activityId: activity1.id,
      vote: "yes",
      issue: "Safe Streets Initiative",
      date: new Date("2025-10-18"),
    });

    // Seed Statistics
    this.createStatisticSync({
      area: "94102",
      areaType: "zipcode",
      crimeRate: 42,
      medianIncome: 85000,
      educationScore: 78,
      housingCost: 950000,
      population: 28500,
      year: 2024,
    });

    this.createStatisticSync({
      area: "94103",
      areaType: "zipcode",
      crimeRate: 38,
      medianIncome: 72000,
      educationScore: 72,
      housingCost: 850000,
      population: 22300,
      year: 2024,
    });

    this.createStatisticSync({
      area: "94110",
      areaType: "zipcode",
      crimeRate: 45,
      medianIncome: 68000,
      educationScore: 70,
      housingCost: 780000,
      population: 31200,
      year: 2024,
    });

    this.createStatisticSync({
      area: "oakland",
      areaType: "city",
      crimeRate: 52,
      medianIncome: 73000,
      educationScore: 68,
      housingCost: 720000,
      population: 440000,
      year: 2024,
    });

    this.createStatisticSync({
      area: "berkeley",
      areaType: "city",
      crimeRate: 35,
      medianIncome: 95000,
      educationScore: 85,
      housingCost: 1200000,
      population: 124000,
      year: 2024,
    });

    this.createStatisticSync({
      area: "california",
      areaType: "state",
      crimeRate: 40,
      medianIncome: 78000,
      educationScore: 75,
      housingCost: 650000,
      population: 39500000,
      year: 2024,
    });

    // Seed Action Plans
    this.createActionPlanSync({
      issueId: issue1.id,
      officialId: official1.id,
      activityId: activity1.id,
      actionType: "call",
      title: "Contact Council Member Johnson about Safe Streets Initiative",
      description: "Call Council Member Sarah Johnson to express support for the Safe Streets Initiative (HB 2847). Mention the dangerous intersection at Main St and 5th Ave as a specific example of why this legislation is needed.",
      dueDate: new Date("2025-11-10"),
      priority: "high",
    });

    this.createActionPlanSync({
      issueId: issue2.id,
      officialId: official2.id,
      activityId: activity2.id,
      actionType: "attend",
      title: "Attend Public Health Committee Meeting",
      description: "Attend the City Council Public Health Committee meeting on November 5th to voice concerns about food access in the Sunset District during the public comment period.",
      dueDate: new Date("2025-11-05"),
      priority: "high",
    });

    this.createActionPlanSync({
      issueId: issue2.id,
      officialId: official3.id,
      activityId: null,
      actionType: "email",
      title: "Email Mayor Rodriguez about Food Desert Issues",
      description: "Send an email to Mayor Emily Rodriguez highlighting the lack of grocery stores in underserved neighborhoods and requesting support for grocery store incentives.",
      dueDate: new Date("2025-11-15"),
      priority: "medium",
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Government Activities
  async getAllGovernmentActivities(): Promise<GovernmentActivity[]> {
    return Array.from(this.governmentActivities.values());
  }

  async getGovernmentActivity(id: string): Promise<GovernmentActivity | undefined> {
    return this.governmentActivities.get(id);
  }

  async createGovernmentActivity(activity: InsertGovernmentActivity): Promise<GovernmentActivity> {
    const id = randomUUID();
    const newActivity: GovernmentActivity = { ...activity, id };
    this.governmentActivities.set(id, newActivity);
    return newActivity;
  }

  private createGovernmentActivitySync(activity: InsertGovernmentActivity): GovernmentActivity {
    const id = randomUUID();
    const newActivity: GovernmentActivity = { ...activity, id };
    this.governmentActivities.set(id, newActivity);
    return newActivity;
  }

  // Citizen Issues
  async getAllCitizenIssues(): Promise<CitizenIssue[]> {
    return Array.from(this.citizenIssues.values());
  }

  async getCitizenIssue(id: string): Promise<CitizenIssue | undefined> {
    return this.citizenIssues.get(id);
  }

  async createCitizenIssue(issue: InsertCitizenIssue): Promise<CitizenIssue> {
    const id = randomUUID();
    const newIssue: CitizenIssue = {
      ...issue,
      id,
      votes: 0,
      status: "pending",
      createdAt: new Date(),
      matchedActivityId: null,
    };
    this.citizenIssues.set(id, newIssue);
    return newIssue;
  }

  private createCitizenIssueSync(issue: InsertCitizenIssue): CitizenIssue {
    const id = randomUUID();
    const newIssue: CitizenIssue = {
      ...issue,
      id,
      votes: 0,
      status: "pending",
      createdAt: new Date(),
      matchedActivityId: null,
    };
    this.citizenIssues.set(id, newIssue);
    return newIssue;
  }

  async updateCitizenIssue(id: string, updates: Partial<CitizenIssue>): Promise<CitizenIssue | undefined> {
    const issue = this.citizenIssues.get(id);
    if (!issue) return undefined;
    
    const updated = { ...issue, ...updates };
    this.citizenIssues.set(id, updated);
    return updated;
  }

  // Officials
  async getAllOfficials(): Promise<Official[]> {
    return Array.from(this.officials.values());
  }

  async getOfficial(id: string): Promise<Official | undefined> {
    return this.officials.get(id);
  }

  async createOfficial(official: InsertOfficial): Promise<Official> {
    const id = randomUUID();
    const newOfficial: Official = { ...official, id };
    this.officials.set(id, newOfficial);
    return newOfficial;
  }

  private createOfficialSync(official: InsertOfficial): Official {
    const id = randomUUID();
    const newOfficial: Official = { ...official, id };
    this.officials.set(id, newOfficial);
    return newOfficial;
  }

  // Vote Records
  async getAllVoteRecords(): Promise<VoteRecord[]> {
    return Array.from(this.voteRecords.values());
  }

  async getVoteRecordsByOfficial(officialId: string): Promise<VoteRecord[]> {
    return Array.from(this.voteRecords.values()).filter(
      (record) => record.officialId === officialId
    );
  }

  async createVoteRecord(record: InsertVoteRecord): Promise<VoteRecord> {
    const id = randomUUID();
    const newRecord: VoteRecord = { ...record, id };
    this.voteRecords.set(id, newRecord);
    return newRecord;
  }

  private createVoteRecordSync(record: InsertVoteRecord): VoteRecord {
    const id = randomUUID();
    const newRecord: VoteRecord = { ...record, id };
    this.voteRecords.set(id, newRecord);
    return newRecord;
  }

  // Statistics
  async getAllStatistics(): Promise<Statistic[]> {
    return Array.from(this.statistics.values());
  }

  async getStatisticByArea(area: string): Promise<Statistic | undefined> {
    return Array.from(this.statistics.values()).find(
      (stat) => stat.area === area
    );
  }

  async createStatistic(stat: InsertStatistic): Promise<Statistic> {
    const id = randomUUID();
    const newStat: Statistic = { ...stat, id };
    this.statistics.set(id, newStat);
    return newStat;
  }

  private createStatisticSync(stat: InsertStatistic): Statistic {
    const id = randomUUID();
    const newStat: Statistic = { ...stat, id };
    this.statistics.set(id, newStat);
    return newStat;
  }

  // Action Plans
  async getAllActionPlans(): Promise<ActionPlan[]> {
    return Array.from(this.actionPlans.values());
  }

  async getActionPlan(id: string): Promise<ActionPlan | undefined> {
    return this.actionPlans.get(id);
  }

  async createActionPlan(plan: InsertActionPlan): Promise<ActionPlan> {
    const id = randomUUID();
    const newPlan: ActionPlan = { ...plan, id };
    this.actionPlans.set(id, newPlan);
    return newPlan;
  }

  private createActionPlanSync(plan: InsertActionPlan): ActionPlan {
    const id = randomUUID();
    const newPlan: ActionPlan = { ...plan, id };
    this.actionPlans.set(id, newPlan);
    return newPlan;
  }
}

export const storage = new MemStorage();
