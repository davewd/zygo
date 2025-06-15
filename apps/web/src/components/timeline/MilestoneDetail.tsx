import type { FamilyMember, Milestone, MilestoneEvidence, MilestoneProgress } from '@zygo/types';
import { Button } from '@zygo/ui';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle,
  Circle,
  Clock,
  Edit,
  FileText,
  Mic,
  Plus,
  Trophy,
  Video,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

interface MilestoneDetailProps {
  milestone: Milestone;
  progress: MilestoneProgress[];
  familyMembers: FamilyMember[];
  onClose: () => void;
  onUpdateProgress: (familyMemberId: string, progress: Partial<MilestoneProgress>) => void;
  onAddEvidence: (familyMemberId: string, evidence: MilestoneEvidence) => void;
}

const MilestoneDetail: React.FC<MilestoneDetailProps> = ({
  milestone,
  progress,
  familyMembers,
  onClose,
  onUpdateProgress,
  onAddEvidence,
}) => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<string>(
    familyMembers[0]?.id || ''
  );
  const [newNote, setNewNote] = useState('');
  const [showAddEvidence, setShowAddEvidence] = useState(false);

  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'not_started':
        return <Circle className="w-5 h-5 text-gray-400" />;
      case 'deferred':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <Camera className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Mic className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const currentProgress = progress.find((p) => p.familyMemberId === selectedFamilyMember);
  const selectedMember = familyMembers.find((m) => m.id === selectedFamilyMember);

  const updateStatus = (status: MilestoneStatus) => {
    const updates: Partial<MilestoneProgress> = { status };

    if (status === 'completed' && !currentProgress?.dateCompleted) {
      updates.dateCompleted = new Date().toISOString();
    } else if (status === 'in_progress' && !currentProgress?.dateStarted) {
      updates.dateStarted = new Date().toISOString();
    }

    onUpdateProgress(selectedFamilyMember, updates);
  };

  const addNote = () => {
    if (newNote.trim()) {
      onUpdateProgress(selectedFamilyMember, {
        notes: newNote.trim(),
      });
      setNewNote('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h1 className="text-2xl font-bold text-gray-800">{milestone.title}</h1>
            </div>
            <p className="text-gray-600 mb-4">{milestone.description}</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{milestone.ageRange.replace('_', ' ')}</span>
                <span className="text-gray-400">
                  ({milestone.minAgeMonths}-{milestone.maxAgeMonths} months)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    milestone.priority === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : milestone.priority === 'high'
                      ? 'bg-orange-100 text-orange-800'
                      : milestone.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {milestone.priority.toUpperCase()} PRIORITY
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {milestone.category.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Family Member Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Track Progress For:</h3>
            <div className="flex flex-wrap gap-2">
              {familyMembers.map((member) => (
                <Button
                  key={member.id}
                  variant={selectedFamilyMember === member.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFamilyMember(member.id)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <span>{member.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {selectedMember && (
            <>
              {/* Progress Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Progress Status for {selectedMember.name}
                </h4>

                <div className="flex space-x-2 mb-4">
                  {(
                    ['not_started', 'in_progress', 'completed', 'deferred'] as MilestoneStatus[]
                  ).map((status) => (
                    <Button
                      key={status}
                      variant={currentProgress?.status === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateStatus(status)}
                      className="flex items-center space-x-2"
                    >
                      {getStatusIcon(status)}
                      <span className="capitalize">{status.replace('_', ' ')}</span>
                    </Button>
                  ))}
                </div>

                {currentProgress && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {currentProgress.dateStarted && (
                      <div>
                        <span className="font-medium text-gray-600">Started:</span>
                        <div>{new Date(currentProgress.dateStarted).toLocaleDateString()}</div>
                      </div>
                    )}
                    {currentProgress.dateCompleted && (
                      <div>
                        <span className="font-medium text-gray-600">Completed:</span>
                        <div>{new Date(currentProgress.dateCompleted).toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Notes & Observations</h4>

                {currentProgress?.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-blue-800">{currentProgress.notes}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about progress..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addNote()}
                  />
                  <Button onClick={addNote} disabled={!newNote.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Evidence Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">Evidence & Documentation</h4>
                  <Button variant="outline" size="sm" onClick={() => setShowAddEvidence(true)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Evidence
                  </Button>
                </div>

                {currentProgress?.evidence && currentProgress.evidence.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentProgress.evidence.map((evidence, index) => (
                      <div key={evidence.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getEvidenceIcon(evidence.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-gray-500 uppercase">
                                {evidence.type}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(evidence.dateRecorded).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800">{evidence.description}</p>
                            {evidence.url && (
                              <a
                                href={evidence.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                View {evidence.type}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No evidence documented yet</p>
                    <p className="text-sm">Add photos, videos, or notes to track progress</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Milestone Details */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Milestone Details</h4>

            {milestone.type === 'simple' && milestone.criteria && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Success Criteria:</h5>
                <p className="text-gray-600">{milestone.criteria}</p>
              </div>
            )}

            {milestone.type === 'composite' && milestone.subMilestones && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Sub-milestones:</h5>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {milestone.subMilestones.map((subId) => (
                    <li key={subId}>{subId.replace('_', ' ')}</li>
                  ))}
                </ul>
              </div>
            )}

            {milestone.prerequisites && milestone.prerequisites.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Prerequisites:</h5>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {milestone.prerequisites.map((prereqId) => (
                    <li key={prereqId}>{prereqId.replace('_', ' ')}</li>
                  ))}
                </ul>
              </div>
            )}

            {milestone.resources && milestone.resources.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Helpful Resources:</h5>
                <div className="space-y-2">
                  {milestone.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <BookOpen className="w-4 h-4 mt-1 text-gray-500" />
                      <div>
                        <h6 className="font-medium text-gray-800">{resource.title}</h6>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Access Resource →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Version {milestone.version} • Last modified{' '}
              {new Date(milestone.modifiedDate).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Customize
              </Button>
              <Button onClick={onClose}>Done</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneDetail;
