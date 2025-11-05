"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface RegistrationFormProps {
  onSuccess?: () => void
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [teamName, setTeamName] = useState("")
  const [institution, setInstitution] = useState("")
  const [leaderName, setLeaderName] = useState("")
  const [leaderEmail, setLeaderEmail] = useState("")
  const [leaderPhone, setLeaderPhone] = useState("")
  const [members, setMembers] = useState<{ name: string; email: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: "", email: "" }])
    } else {
      toast.error("Maximum 4 members per team (including leader)")
    }
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const updateMember = (index: number, field: "name" | "email", value: string) => {
    const updated = [...members]
    updated[index][field] = value
    setMembers(updated)
  }

  const totalMembers = members.length + 1 // +1 for leader
  const totalFee = totalMembers * 49

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validation
    if (!teamName || !institution || !leaderName || !leaderEmail || !leaderPhone) {
      toast.error("Please fill all required fields")
      return
    }

    if (totalMembers < 2) {
      toast.error("Minimum 2 members required (including team leader)")
      return
    }

    for (let member of members) {
      if (!member.name || !member.email) {
        toast.error("Please fill all member details")
        return
      }
    }

    setIsSubmitting(true)

    try {
      // 1. Insert team data
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert({
          team_name: teamName,
          institution: institution,
          leader_name: leaderName,
          leader_email: leaderEmail,
          leader_phone: leaderPhone,
          total_members: totalMembers,
          total_fee: totalFee,
        })
        .select()
        .single()

      if (teamError) {
        console.error("Team insert error:", teamError)
        toast.error(`Failed to register team: ${teamError.message}`)
        setIsSubmitting(false)
        return
      }

      // 2. Insert team members if any
      if (members.length > 0 && teamData) {
        const membersToInsert = members.map((member) => ({
          team_id: teamData.id,
          name: member.name,
          email: member.email,
        }))

        const { error: membersError } = await supabase
          .from("team_members")
          .insert(membersToInsert)

        if (membersError) {
          console.error("Members insert error:", membersError)
          toast.error(`Team created but failed to add members: ${membersError.message}`)
          setIsSubmitting(false)
          return
        }
      }

      toast.success("Registration saved successfully! Payment integration coming soon.")
      console.log({
        teamName,
        institution,
        leader: { name: leaderName, email: leaderEmail, phone: leaderPhone },
        members,
        totalFee,
      })

      onSuccess?.()

      // Reset form
      setTeamName("")
      setInstitution("")
      setLeaderName("")
      setLeaderEmail("")
      setLeaderPhone("")
      setMembers([])
    } catch (error) {
      console.error("Unexpected error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Details */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-accent" />
          Team Details
        </h3>

        <div>
          <Label htmlFor="teamName" className="text-foreground">Team Name *</Label>
          <Input
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            className="w-full bg-input border border-border"
            required
          />
        </div>

        <div>
          <Label htmlFor="institution" className="text-foreground">College/Institution *</Label>
          <Input
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Enter your college name"
            className="w-full bg-input border border-border"
            required
          />
        </div>
      </div>

      {/* Team Leader */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-xl font-bold text-foreground">Team Leader Details *</h3>

        <div>
          <Label htmlFor="leaderName" className="text-foreground">Full Name *</Label>
          <Input
            id="leaderName"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            placeholder="Enter leader's name"
            className="w-full bg-input border border-border"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="leaderEmail" className="text-foreground">Email *</Label>
            <Input
              id="leaderEmail"
              type="email"
              value={leaderEmail}
              onChange={(e) => setLeaderEmail(e.target.value)}
              placeholder="leader@example.com"
              className="w-full bg-input border border-border"
              required
            />
          </div>
          <div>
            <Label htmlFor="leaderPhone" className="text-foreground">Phone *</Label>
            <Input
              id="leaderPhone"
              type="tel"
              value={leaderPhone}
              onChange={(e) => setLeaderPhone(e.target.value)}
              placeholder="+91 XXXXXXXXXX"
              className="w-full bg-input border border-border"
              required
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Team Members</h3>
          <Button
            type="button"
            onClick={addMember}
            variant="outline"
            size="sm"
            disabled={members.length >= 3}
            className="border-accent text-accent hover:bg-accent/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {members.map((member, index) => (
          <div key={index} className="bg-secondary/20 border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-muted-foreground">Member {index + 1}</p>
              <Button
                type="button"
                onClick={() => removeMember(index)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Name *</Label>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                  placeholder="Member name"
                  className="w-full bg-input border border-border"
                  required
                />
              </div>
              <div>
                <Label className="text-foreground">Email *</Label>
                <Input
                  type="email"
                  value={member.email}
                  onChange={(e) => updateMember(index, "email", e.target.value)}
                  placeholder="member@example.com"
                  className="w-full bg-input border border-border"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <p className="text-sm text-muted-foreground">
          Minimum 2 members, Maximum 4 members (including team leader)
        </p>
      </div>

      {/* Fee Summary */}
      <div className="bg-accent/10 border border-accent rounded-lg p-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-foreground">Team Members:</span>
          <span className="text-foreground font-semibold">{totalMembers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground">Fee per Member:</span>
          <span className="text-foreground font-semibold">₹49</span>
        </div>
        <div className="border-t border-accent pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total Amount:</span>
            <span className="text-2xl font-bold text-accent">₹{totalFee}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Payment gateway integration coming soon. Currently in development.
      </p>
    </form>
  )
}
